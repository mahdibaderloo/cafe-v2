package org.cafe.app.service;

import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.OrderResponseDto;
import org.cafe.app.entity.Order;
import org.cafe.app.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemService orderItemService;

    public List<OrderResponseDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream()
                .map(this::OrderToDto)
                .collect(Collectors.toList());
    }

    private OrderResponseDto OrderToDto(Order order) {
        return OrderResponseDto.builder()
                .id(order.getId())
                .createdAt(order.getCreatedAt())
                .totalPrice(order.getTotalPrice())
                .username(order.getUsername())
                .phoneNumber(order.getPhoneNumber())
                .takeAway(order.isTakeAway())
                .description(order.getDescription())
                .items(order.getItems().stream()
                        .map(orderItemService::convertToItemDto)
                        .collect(Collectors.toList()))
                .build();
    }
}