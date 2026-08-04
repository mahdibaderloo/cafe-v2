package org.cafe.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.cafe.app.enums.DiscountType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "discount")
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DiscountType type;

    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    private String code;
    private boolean isActive;
    private Integer maxUsage;
    private int usedCount;
    private BigDecimal discountValue;
}
