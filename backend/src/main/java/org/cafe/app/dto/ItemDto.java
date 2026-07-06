package org.cafe.app.dto;

import lombok.Data;
import org.cafe.app.entity.Category;

import java.math.BigDecimal;

@Data
public class ItemDto {
    private Long id;
    private String productName;
    private BigDecimal price;
    private String image;
    private String description;
    private String categoryName;

    public ItemDto(Long id, String productName, BigDecimal price, String description, Long id1, String name, String image) {
    }
}
