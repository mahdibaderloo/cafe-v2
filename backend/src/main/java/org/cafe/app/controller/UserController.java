package org.cafe.app.controller;

import lombok.Data;
import org.cafe.app.dto.LoginRequestDto;
import org.cafe.app.dto.UserDto;
import org.cafe.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Data
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginRequestDto request) {
        return ResponseEntity.ok(userService.login(request.getEmail(), request.getPassword()));
    }

}
