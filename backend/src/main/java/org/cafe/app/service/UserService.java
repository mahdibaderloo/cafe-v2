package org.cafe.app.service;

import lombok.Data;
import org.cafe.app.dto.UserDto;
import org.cafe.app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Service
public class UserService {

    final private UserRepository userRepository;

    public UserDto login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}
