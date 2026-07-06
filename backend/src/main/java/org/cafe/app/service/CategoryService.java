package org.cafe.app.service;

import lombok.Data;
import org.cafe.app.dto.CategoryDto;
import org.cafe.app.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
public class CategoryService {

    final private CategoryRepository categoryRepository;

    public List<CategoryDto> getMainCategories() {
        return categoryRepository.findByParentIsNull();
    }
}
