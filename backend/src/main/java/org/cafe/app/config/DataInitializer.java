package org.cafe.app.config;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.cafe.app.entity.User;
import org.cafe.app.enums.Role;
import org.cafe.app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(@NonNull String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin1 = User.builder()
                    .username("Sepehr Karimi")
                    .email("Sepehrkarimi19theoiran@gmail.com")
                    .image("")
                    .password(passwordEncoder.encode("Sepehr#81k.3"))
                    .role(Role.ADMIN)
                    .build();

            User admin2 = User.builder()
                    .username("Mahdi Takestani")
                    .email("Sepehrkarimi19theoiran@gmail.com")
                    .image("")
                    .password(passwordEncoder.encode("Mahdi.tk@1"))
                    .role(Role.ADMIN)
                    .build();

            User admin3 = User.builder()
                    .username("ADMIN")
                    .email("admin@gmail.com")
                    .image("")
                    .password(passwordEncoder.encode("admin111"))
                    .role(Role.ADMIN)
                    .build();


            userRepository.save(admin1);
            userRepository.save(admin2);

            System.out.println("✅ کارب ایجاد شد!");
        }
    }
}