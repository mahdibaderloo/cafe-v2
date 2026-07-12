package org.cafe.app.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
@Data
public class LoginRequestDto {
    @NotBlank(message = "ایمیل الزامی است")
    @Email(message = "ایمیل نامعتبر است")
    private String email;

    @NotBlank(message = "رمز عبور الزامی است")
    private String password;
}
