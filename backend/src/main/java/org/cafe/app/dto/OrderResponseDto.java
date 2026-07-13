package org.cafe.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponseDto {
    private Long id;
    private LocalDateTime createdAt;
    private BigDecimal totalPrice;
    private String username;
    private String phoneNumber;
    private boolean takeAway;
    private String description;
    private List<OrderItemResponseDto> items;
}