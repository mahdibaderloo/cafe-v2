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

    public UserDto(Long id, String username, String email, Role userRole, String image, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.image = image;
        this.role = role;
    }
}
