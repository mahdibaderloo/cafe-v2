package org.cafe.app.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String image;
    private String role;

    public UserDto(Long id, String username, String image, String email, String role) {
    }
}
