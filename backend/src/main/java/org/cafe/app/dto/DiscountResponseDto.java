package org.cafe.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiscountResponseDto {
    private Long id;
    private String type;
    private String code;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private Integer maxUsage;
    private Integer usedCount;
    private BigDecimal discountValue;
}