package org.cafe.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemResponseDto {
    private Long id;
    private String productName;
    private BigDecimal price;
    private String image;
    private String description;
    private Long categoryId;
    private String categoryName;

    public ItemResponseDto(Long id, String productName, BigDecimal price, String description, Long categoryId, String categoryName, String image) {
        this.id = id;
        this.productName = productName;
        this.price = price;
        this.description = description;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.image = image;
    }
}
