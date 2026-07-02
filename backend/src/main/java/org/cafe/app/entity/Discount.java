package org.cafe.app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "discount")
@Data
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String type;
    private LocalDateTime createdAt;
    private boolean isActive;
    private LocalDateTime expiresAt;
    private int maxUsage;
    private int usedCount;
}
