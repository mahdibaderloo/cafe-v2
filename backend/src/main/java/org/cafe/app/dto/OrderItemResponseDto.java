package org.cafe.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemResponseDto {
    private Long id;
    private Long itemId;
    private String itemName;
    private String itemDescription;
    private Integer count;
    private BigDecimal price;
    private BigDecimal subtotal;
}