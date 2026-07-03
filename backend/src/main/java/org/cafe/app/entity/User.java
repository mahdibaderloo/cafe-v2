package org.cafe.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.cafe.app.enums.Role;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private Role role;
    private String image;
    private String email;
}
