package org.cafe.app.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ItemDto {
    private Long id;
    private String productName;
    private BigDecimal price;
    private String image;
    private String description;
    private String categoryName;
}
