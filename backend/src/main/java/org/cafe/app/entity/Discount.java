package org.cafe.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.cafe.app.enums.DiscountType;

import java.time.LocalDateTime;

@Entity
@Table(name = "discount")
@Data
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DiscountType type;

    private String code;
    private LocalDateTime createdAt;
    private boolean isActive;
    private LocalDateTime expiresAt;
    private Integer maxUsage;
    private int usedCount;
}
