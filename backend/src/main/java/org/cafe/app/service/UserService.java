package org.cafe.app.service;

import lombok.Data;
import org.cafe.app.dto.UserDto;
import org.cafe.app.entity.User;
import org.cafe.app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Service
public class UserService {

    final private UserRepository userRepository;

    public UserDto login(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

//        if (!passwordEncoder.matches(password, user.getPassword())) {
//            throw new RuntimeException("Invalid email or password");
//        }
        return toDto(user);
    }

    private UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getImage(),
                user.getPassword()
        );
    }
}
