package org.cafe.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cafe.app.dto.LoginResponseDto;
import org.cafe.app.entity.User;
import org.cafe.app.repository.UserRepository;
import org.cafe.app.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public LoginResponseDto login(String email, String password) {
        log.info("🔐 Login attempt | Email: {}", email);

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

            log.debug(
                    "✅ Authentication successful | Email: {} | Authenticated: {}",
                    email,
                    authentication.isAuthenticated()
            );

            Object principal = authentication.getPrincipal();

            if (principal == null) {
                log.error("❌ Authentication principal is null | Email: {}", email);
                throw new RuntimeException("خطا در احراز هویت کاربر");
            }

            UserDetails userDetails = (UserDetails) principal;

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> {
                        log.warn("⚠️ User not found after authentication | Email: {}", email);
                        return new RuntimeException("کاربر پیدا نشد");
                    });

            String token = jwtService.generateToken(userDetails);

            log.info(
                    "🎉 Login successful | User ID: {} | Email: {} | Role: {}",
                    user.getId(),
                    user.getEmail(),
                    user.getRole().name()
            );

            return LoginResponseDto.builder()
                    .token(token)
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .image(user.getImage())
                    .role(user.getRole().name())
                    .build();

        } catch (BadCredentialsException e) {
            log.warn("🚫 Login failed due to invalid credentials | Email: {}", email);
            throw new RuntimeException("ایمیل یا رمز عبور اشتباه است!");
        } catch (Exception e) {
            log.error("❌ Login failed | Email: {} | Error: {}", email, e.getMessage(), e);
            throw new RuntimeException("خطا در ورود: " + e.getMessage());
        }
    }
}