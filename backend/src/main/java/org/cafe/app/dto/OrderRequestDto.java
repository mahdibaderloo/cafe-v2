package org.cafe.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.cafe.app.enums.DiscountType;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequestDto {
    private String username;
    private String phoneNumber;
    private boolean takeAway;
    private String description;
    private List<OrderItemRequestDto> items;
    private DiscountType discountType;
    private BigDecimal discountValue;

}