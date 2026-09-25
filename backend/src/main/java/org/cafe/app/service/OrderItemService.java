package org.cafe.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cafe.app.dto.OrderItemResponseDto;
import org.cafe.app.entity.OrderItem;
import org.cafe.app.repository.OrderItemRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final ItemService itemService;

    public List<OrderItemResponseDto> getOrderItems() {
        log.info("📦 Fetching all order items...");

        try {
            List<OrderItem> orderItems = orderItemRepository.findAll();

            log.debug("🔎 Found {} order item(s)", orderItems.size());

            List<OrderItemResponseDto> result = orderItems.stream()
                    .map(this::convertToItemDto)
                    .toList();

            log.info("✅ Successfully converted {} order item(s) to DTO", result.size());

            return result;
        } catch (Exception e) {
            log.error("❌ Failed to fetch order items: {}", e.getMessage(), e);
            throw e;
        }
    }

    public OrderItemResponseDto convertToItemDto(OrderItem orderItem) {
        log.debug(
                "🔄 Converting order item to DTO | OrderItem ID: {} | Item ID: {}",
                orderItem.getId(),
                orderItem.getItem().getId()
        );

        try {
            String category = itemService
                    .getItemById(orderItem.getItem().getId())
                    .getCategoryName();

            BigDecimal subtotal = orderItem.getPrice()
                    .multiply(BigDecimal.valueOf(orderItem.getCount()));

            log.debug(
                    "💰 Calculated order item subtotal | OrderItem ID: {} | Price: {} | Count: {} | Subtotal: {}",
                    orderItem.getId(),
                    orderItem.getPrice(),
                    orderItem.getCount(),
                    subtotal
            );

            return OrderItemResponseDto.builder()
                    .id(orderItem.getId())
                    .itemId(orderItem.getItem().getId())
                    .itemName(orderItem.getItem().getProductName())
                    .itemDescription(orderItem.getItem().getDescription())
                    .categoryName(category)
                    .count(orderItem.getCount())
                    .price(orderItem.getPrice())
                    .subtotal(subtotal)
                    .build();

        } catch (Exception e) {
            log.error("❌ Failed to convert order item | OrderItem ID: {} | Error: {}", orderItem.getId(), e.getMessage(), e);
            throw e;
        }
    }
}