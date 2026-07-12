package org.cafe.app.controller;

import jakarta.validation.Valid;
import org.cafe.app.dto.LoginRequestDto;
import org.cafe.app.dto.LoginResponseDto;
import org.cafe.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto request) {
        return ResponseEntity.ok(userService.login(request.getEmail(), request.getPassword()));
    }

}
