package org.cafe.app.dto;

import lombok.Data;
import org.cafe.app.entity.Category;

@Data
public class CategoryDto {
    private Long id;
    private String name;
    private String image;
    private Category parent;
}
