package org.cafe.app.controller;

import org.cafe.app.dto.LoginRequestDto;
import org.cafe.app.dto.UserDto;
import org.cafe.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginRequestDto request) {
        return ResponseEntity.ok(userService.login(request.getEmail(), request.getPassword()));
    }

}
