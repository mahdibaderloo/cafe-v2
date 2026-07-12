package org.cafe.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private Long id;
    private String token;
    private String username;
    private String email;
    private String image;
    private String role;

    public LoginResponseDto(Long id, String token, String username, String email, String image, String role) {
        this.id = id;
        this.token = token;
        this.username = username;
        this.email = email;
        this.image = image;
        this.role = role;
    }
}
