package org.cafe.app.service;

import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.OrderItemResponseDto;
import org.cafe.app.dto.OrderResponseDto;
import org.cafe.app.entity.Order;
import org.cafe.app.entity.OrderItem;
import org.cafe.app.repository.ItemRepository;
import org.cafe.app.repository.OrderItemRepository;
import org.cafe.app.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final ItemService itemService;

    public List<OrderItemResponseDto> getOrderItems() {
        List<OrderItem> orderItems = orderItemRepository.findAll();

        return orderItems.stream()
                .map(this::convertToItemDto)
                .collect(Collectors.toList());
    }

    public OrderItemResponseDto convertToItemDto(OrderItem orderItem) {
        String category = itemService.getItemById(orderItem.getId()).getCategoryName();

        return OrderItemResponseDto.builder()
                .id(orderItem.getId())
                .itemId(orderItem.getItem().getId())
                .itemName(orderItem.getItem().getProductName())
                .itemDescription(orderItem.getItem().getDescription())
                .categoryName(category)
                .count(orderItem.getCount())
                .price(orderItem.getPrice())
                .subtotal(orderItem.getPrice().multiply(BigDecimal.valueOf(orderItem.getCount())))
                .build();
    }

}
