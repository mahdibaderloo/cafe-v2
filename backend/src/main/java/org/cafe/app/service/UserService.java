package org.cafe.app.service;

import org.cafe.app.dto.UserDto;
import org.cafe.app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    final private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}
