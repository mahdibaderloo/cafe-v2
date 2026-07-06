package org.cafe.app.repository;

import org.cafe.app.dto.CategoryDto;
import org.cafe.app.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<CategoryDto> findByParentIsNull();
}
