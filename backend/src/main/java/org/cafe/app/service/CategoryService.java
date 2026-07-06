package org.cafe.app.service;

import lombok.Data;
import org.cafe.app.dto.CategoryDto;
import org.cafe.app.entity.Category;
import org.cafe.app.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
public class CategoryService {

    final private CategoryRepository categoryRepository;

    public List<CategoryDto> getMainCategories() {
        return categoryRepository.findByParentIsNull().stream().map(this::toDto).toList();
    }

    public List<CategoryDto> getSubCategories(Long id) {
        return categoryRepository.findByParentId(id).stream().map(this::toDto).toList();
    }

    private CategoryDto toDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getImage(),
                category.getParent()
        );
    }
}
