package org.cafe.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cafe.app.dto.DiscountRequestDto;
import org.cafe.app.dto.DiscountResponseDto;
import org.cafe.app.entity.Discount;
import org.cafe.app.repository.DiscountRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiscountService {

    private final DiscountRepository discountRepository;

    @Scheduled(fixedDelay = 1800000)
    @Transactional
    public void autoUpdateDiscountStatus() {
        log.info("🔄 Starting automatic discount status update...");

        try {
            LocalDateTime now = LocalDateTime.now();
            List<Discount> activeDiscounts = discountRepository.findByIsActiveTrue();

            log.debug("🔎 Found {} active discount(s) to check", activeDiscounts.size());

            int updatedCount = 0;

            for (Discount discount : activeDiscounts) {
                boolean shouldDeactivate = false;
                String reason = "";

                if (discount.getExpiresAt() != null &&
                        discount.getExpiresAt().isBefore(now)) {
                    shouldDeactivate = true;
                    reason = "expired";
                }

                if (discount.getMaxUsage() != null &&
                        discount.getUsedCount() >= discount.getMaxUsage()) {
                    shouldDeactivate = true;
                    reason = "maximum usage reached";
                }

                if (shouldDeactivate) {
                    discount.setActive(false);
                    discountRepository.save(discount);
                    updatedCount++;

                    log.info("🔴 Discount deactivated | Code: {} | ID: {} | Reason: {}", discount.getCode(), discount.getId(), reason);
                }
            }

            log.info("✅ Automatic discount status update completed | Checked: {} | Deactivated: {}", activeDiscounts.size(), updatedCount);

        } catch (Exception e) {
            log.error("❌ Failed to automatically update discount statuses: {}", e.getMessage(), e);
            throw e;
        }
    }

    public Page<DiscountResponseDto> getAllDiscounts(Pageable pageable) {
        log.info("📋 Fetching discounts | Page: {} | Size: {}",
                pageable.getPageNumber(), pageable.getPageSize());

        try {
            Pageable sortedPageable = PageRequest.of(
                    pageable.getPageNumber(),
                    pageable.getPageSize(),
                    Sort.by("createdAt").descending()
            );

            Page<DiscountResponseDto> discounts = discountRepository
                    .findAll(sortedPageable)
                    .map(this::toDto);

            log.info("✅ Discounts fetched | Page: {} | Returned: {} | Total: {}",
                    pageable.getPageNumber(),
                    discounts.getNumberOfElements(),
                    discounts.getTotalElements());

            return discounts;

        } catch (Exception e) {
            log.error("❌ Failed to fetch discounts: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    public DiscountResponseDto generateDiscountCode(DiscountRequestDto request) {
        log.info(
                "🎟️ Creating new discount | Code: {} | Type: {} | Value: {}",
                request.getCode(),
                request.getType(),
                request.getDiscountValue()
        );

        try {
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

            log.info("✅ Discount created successfully | ID: {} | Code: {}", savedDiscount.getId(), savedDiscount.getCode());
            return toDto(savedDiscount);

        } catch (Exception e) {
            log.error("❌ Failed to create discount | Code: {} | Error: {}", request.getCode(), e.getMessage(), e);
            throw e;
        }
    }

    public Optional<DiscountResponseDto> getDiscount(Long id) {
        log.info("🔍 Fetching discount | ID: {}", id);

        Optional<DiscountResponseDto> discount = discountRepository.findById(id).map(this::toDto);

        if (discount.isPresent()) {
            log.info("✅ Discount found | ID: {}", id);
        } else {
            log.warn("⚠️ Discount not found | ID: {}", id);
        }

        return discount;
    }

    public DiscountResponseDto toDto(Discount discount) {
        log.debug("🔄 Mapping discount to DTO | ID: {} | Code: {}", discount.getId(), discount.getCode());

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

    @Transactional
    public DiscountResponseDto expireCode(Long id) {
        log.info("⏳ Expiring discount manually | ID: {}", id);

        try {
            Discount discount = discountRepository.findByIdForUpdate(id).orElseThrow(() -> new RuntimeException("Discount not found."));

            discount.setActive(false);

            log.info("🔴 Discount expired successfully | ID: {} | Code: {}", discount.getId(), discount.getCode());
            return toDto(discount);

        } catch (Exception e) {
            log.error("❌ Failed to expire discount | ID: {} | Error: {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    public DiscountResponseDto useCode(String code) {
        log.info("🎫 Attempting to use discount code: {}", code);

        try {
            Discount discount = discountRepository.findByCodeForUpdate(code)
                    .orElseThrow(() -> new RuntimeException("Discount not found."));

            if (!discount.isActive()) {
                log.warn("⚠️ Discount code is inactive | Code: {} | ID: {}", code, discount.getId());
                throw new RuntimeException("Discount code is inactive.");
            }

            if (discount.getMaxUsage() != null &&
                    discount.getUsedCount() >= discount.getMaxUsage()) {
                log.warn(
                        "⚠️ Discount usage limit reached | Code: {} | Used: {} | Max: {}",
                        code,
                        discount.getUsedCount(),
                        discount.getMaxUsage()
                );
                throw new RuntimeException("Discount code cannot be used anymore.");
            }

            if (discount.getExpiresAt() != null &&
                    !discount.getExpiresAt().isAfter(LocalDateTime.now())) {
                log.warn("⚠️ Discount code has expired | Code: {} | ExpiresAt: {}", code, discount.getExpiresAt());
                throw new RuntimeException("Discount code expired.");
            }

            int previousUsage = discount.getUsedCount();

            discount.setUsedCount(previousUsage + 1);

            log.info(
                    "✅ Discount code used successfully | Code: {} | Usage: {}/{}",
                    code,
                    discount.getUsedCount(),
                    discount.getMaxUsage()
            );

            return toDto(discount);

        } catch (Exception e) {
            log.error("❌ Failed to use discount code | Code: {} | Error: {}", code, e.getMessage(), e);
            throw e;
        }
    }
}