package org.cafe.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemRequestDto {
    @NotBlank(message = "نام محصول الزامی است")
    private String productName;

    @NotNull(message = "قیمت الزامی است")
    @Positive(message = "قیمت باید مثبت باشد")
    private BigDecimal price;

    private String image;
    private String description;

    @NotNull(message = "دسته‌بندی الزامی است")
    private Long categoryId;
}