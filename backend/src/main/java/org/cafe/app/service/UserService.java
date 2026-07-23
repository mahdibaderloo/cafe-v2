package org.cafe.app.service;

import lombok.RequiredArgsConstructor;
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

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public LoginResponseDto login(String email, String password) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            Object principal = authentication.getPrincipal();
            if (principal == null) {
                throw new RuntimeException("خطا در احراز هویت کاربر");
            }

            UserDetails userDetails = (UserDetails) principal;
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("کاربر پیدا نشد"));

            String token = jwtService.generateToken(userDetails);

            return LoginResponseDto.builder()
                    .token(token)
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .image(user.getImage())
                    .role(user.getRole().name())
                    .build();
        } catch (BadCredentialsException e) {
            throw new RuntimeException("ایمیل یا رمز عبور اشتباه است!");
        } catch (Exception e) {
            throw new RuntimeException("خطا در ورود: " + e.getMessage());
        }

    }
}