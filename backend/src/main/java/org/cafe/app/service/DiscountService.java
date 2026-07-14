package org.cafe.app.service;

import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.DiscountResponseDto;
import org.cafe.app.entity.Discount;
import org.cafe.app.repository.DiscountRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import static org.hibernate.validator.internal.engine.messageinterpolation.el.RootResolver.FORMATTER;

@Service
@RequiredArgsConstructor
public class DiscountService {

    private final DiscountRepository discountRepository;

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public List<DiscountResponseDto> getAllDiscounts () {
        return discountRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    };

    public DiscountResponseDto toDto (Discount discount) {
        return DiscountResponseDto.builder()
                .id(discount.getId())
                .code(discount.getCode())
                .type(discount.getType().name())
                .createdAt(discount.getCreatedAt() != null ?
                        discount.getCreatedAt().format(DateTimeFormatter.ofPattern(String.valueOf(FORMATTER))) :
                        null)
                .expiresAt(discount.getExpiresAt() != null ?
                        discount.getExpiresAt().format(DateTimeFormatter.ofPattern(String.valueOf(FORMATTER))) :
                        null)
                .isActive(discount.isActive())
                .maxUsage(discount.getMaxUsage())
                .usedCount(discount.getUsedCount())
                .discountValue(discount.getDiscountValue())
                .build();
    }
}
