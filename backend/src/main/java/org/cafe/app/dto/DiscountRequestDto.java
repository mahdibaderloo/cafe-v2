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

    @NotNull(message = "نوع تخفیف باید مشخص باشد")
    private DiscountType type;

    @NotBlank(message = "کد تخفیف الزامی است")
    @Size(min = 5, max = 5, message = "کد تخفیف باید ۵ کاراکتر باشد")
    private String code;

    @NotNull(message = "تاریخ انقضا الزامی است")
    @Future(message = "تاریخ انقضا باید در آینده باشد")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime expiresAt;

    @NotNull(message = "حداکثر استفاده الزامی است")
    @Positive(message = "حداکثر استفاده باید حداقل 1 باشد")
    private Integer maxUsage;

    @NotNull(message = "مقدار تخفیف الزامی است")
    @Positive(message = "مقدار تخفیف باید مثبت باشد")
    private BigDecimal discountValue;
}
