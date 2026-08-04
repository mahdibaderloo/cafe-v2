package org.cafe.app.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.cafe.app.enums.DiscountType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiscountRequestDto {

    @NotNull(message = "Discount type is required")
    private DiscountType type;

    @NotBlank(message = "Discount code is required")
    @Size(min = 5, max = 10, message = "Code must be between 3 and 50 characters")
    private String code;

    @NotNull(message = "تاریخ انقضا الزامی است")
    @Future(message = "تاریخ انقضا باید در آینده باشد")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime expiresAt;

    @Positive(message = "Max usage must be positive")
    private Integer maxUsage;

    @NotNull(message = "Discount value is required")
    @Positive(message = "Discount value must be positive")
    private BigDecimal discountValue;
}
