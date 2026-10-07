package org.cafe.app.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cafe.app.exception.ErrorResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final ObjectMapper objectMapper;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();

        return path.startsWith("/api/users/login")
                || path.startsWith("/api/categories")
                || (request.getMethod().equals("GET") && path.startsWith("/api/items"))
                || path.startsWith("/api/orders/submit-order")
                || path.startsWith("/api/discount/use-code/")
                || path.startsWith("/uploads");
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);

        try {
            final String email = jwtService.extractEmail(jwt);

            if (email == null || email.isBlank()) {
                sendUnauthorized(response, request);
                return;
            }

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                if (!jwtService.isTokenValid(jwt, userDetails)) {
                    sendUnauthorized(response, request);
                    return;
                }

                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                log.info("✅ User authenticated: {}", email);
            }

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            log.warn("❌ Invalid JWT | Path: {} | Message: {}", request.getRequestURI(), e.getMessage());
            sendUnauthorized(response, request);
        }
    }

    private void sendUnauthorized(HttpServletResponse response, HttpServletRequest request) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .success(false)
                .status(401)
                .error("UNAUTHORIZED")
                .message("نشست شما منقضی شده است.")
                .path(request.getRequestURI())
                .timestamp(LocalDateTime.now())
                .validationErrors(null)
                .build();

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}