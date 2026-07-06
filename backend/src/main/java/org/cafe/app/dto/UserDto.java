package org.cafe.app.dto;

import lombok.Data;
import org.cafe.app.enums.Role;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String image;
    private String role;

    public UserDto(Long id, String username, String email, Role role, String image, String password) {
    }
}
