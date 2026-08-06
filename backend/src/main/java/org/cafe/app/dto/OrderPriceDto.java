package org.cafe.app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class OrderPriceDto {
    private Long orderId;
    private BigDecimal totalPrice;

    public OrderPriceDto(Long orderId, BigDecimal totalPrice) {
        this.orderId = orderId;
        this.totalPrice = totalPrice;
    }
}
