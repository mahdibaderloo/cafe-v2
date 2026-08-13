package org.cafe.app.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cafe.app.dto.DiscountRequestDto;
import org.cafe.app.dto.DiscountResponseDto;
import org.cafe.app.entity.Discount;
import org.cafe.app.repository.DiscountRepository;
import org.springframework.data.domain.Page;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import static org.hibernate.validator.internal.engine.messageinterpolation.el.RootResolver.FORMATTER;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiscountService {

    private final DiscountRepository discountRepository;

    @Scheduled(fixedDelay = 1800000)
    @Transactional
    public void autoUpdateDiscountStatus() {
        log.info("🔄 Starting auto-update discount status at: {}", LocalDateTime.now());

        List<Discount> activeDiscounts = discountRepository.findByIsActiveTrue();

        int updatedCount = 0;

        for (Discount discount : activeDiscounts) {
            boolean shouldDeactivate = false;
            String reason = "";

            if (discount.getExpiresAt() != null &&
                    discount.getExpiresAt().isBefore(LocalDateTime.now())) {
                shouldDeactivate = true;
                reason = "expired";
            }

            if (discount.getMaxUsage() != null &&
                    discount.getUsedCount() >= discount.getMaxUsage()) {
                shouldDeactivate = true;
                reason = "max usage reached";
            }

            if (shouldDeactivate) {
                discount.setActive(false);
                discountRepository.save(discount);
                updatedCount++;
                log.info("🔴 Deactivated discount: {} - Reason: {}", discount.getCode(), reason);
            }
        }
        log.info("✅ Auto-update completed. Deactivated {} discount(s)", updatedCount);
    }

    public Page<DiscountResponseDto> getAllDiscounts(Pageable pageable) {
        return discountRepository.findAll(pageable)
                .map(this::toDto);
    }

    @Transactional
    public DiscountResponseDto generateDiscountCode(DiscountRequestDto request) {

        Discount discount = Discount.builder()
                .discountValue(request.getDiscountValue())
                .code(request.getCode())
                .type(request.getType())
                .maxUsage(request.getMaxUsage())
                .isActive(true)
                .usedCount(0)
                .createdAt(LocalDateTime.now())
                .expiresAt(request.getExpiresAt())
                .build();

        Discount savedDiscount = discountRepository.save(discount);

        return toDto(savedDiscount);
    }

    public Optional<DiscountResponseDto> getDiscount(@Valid Long id) {
        return discountRepository.findById(id).map(this::toDto);
    }

    public DiscountResponseDto toDto (Discount discount) {
        return DiscountResponseDto.builder()
                .id(discount.getId())
                .code(discount.getCode())
                .type(discount.getType().name())
                .createdAt(discount.getCreatedAt())
                .expiresAt(discount.getExpiresAt())
                .isActive(discount.isActive())
                .maxUsage(discount.getMaxUsage())
                .usedCount(discount.getUsedCount())
                .discountValue(discount.getDiscountValue())
                .build();
    }

}