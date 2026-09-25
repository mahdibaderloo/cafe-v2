package org.cafe.app.service;

import org.cafe.app.dto.CategoryDto;
import org.cafe.app.entity.Category;
import org.cafe.app.repository.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private static final Logger log = LoggerFactory.getLogger(CategoryService.class);

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
        log.info("🛠️ CategoryService initialized successfully");
    }

    public List<CategoryDto> getMainCategories() {
        log.info("📂 Fetching main categories...");

        try {
            List<CategoryDto> categories = categoryRepository.findByParentIsNull()
                    .stream()
                    .map(this::toDto)
                    .toList();

            log.info("✅ Successfully fetched {} main categories", categories.size());

            return categories;
        } catch (Exception e) {
            log.error("❌ Failed to fetch main categories: {}", e.getMessage(), e);
            throw e;
        }
    }

    public List<CategoryDto> getSubCategories(Long id) {
        log.info("📁 Fetching subcategories for parent category ID: {}", id);

        try {
            List<CategoryDto> categories = categoryRepository.findByParentId(id)
                    .stream()
                    .map(this::toDto)
                    .toList();

            log.info("✅ Successfully fetched {} subcategories for parent category ID: {}", categories.size(), id);

            return categories;
        } catch (Exception e) {
            log.error("❌ Failed to fetch subcategories for parent category ID: {} - {}", id, e.getMessage(), e);
            throw e;
        }
    }

    private CategoryDto toDto(Category category) {
        log.debug("🔄 Mapping category ID: {} to CategoryDto", category.getId());

        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getImage(),
                category.getParent() == null ? null : category.getParent().getId()
        );
    }
}