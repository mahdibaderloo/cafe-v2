package org.cafe.app.service;

import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.ItemDto;
import org.cafe.app.dto.OrderItemRequestDto;
import org.cafe.app.dto.OrderRequestDto;
import org.cafe.app.dto.OrderResponseDto;
import org.cafe.app.entity.Item;
import org.cafe.app.entity.Order;
import org.cafe.app.entity.OrderItem;
import org.cafe.app.repository.ItemRepository;
import org.cafe.app.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemService orderItemService;
    private final ItemRepository itemRepository;

    public List<OrderResponseDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream()
                .map(this::OrderResponseToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponseDto createOrder(OrderRequestDto requestDto) {

        Order order = Order.builder()
                .createdAt(LocalDateTime.now())
                .username(requestDto.getUsername())
                .phoneNumber(requestDto.getPhoneNumber())
                .takeAway(requestDto.isTakeAway())
                .description(requestDto.getDescription())
                .build();

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalPrice = BigDecimal.ZERO;

        for (OrderItemRequestDto itemDto : requestDto.getItems()) {

            Item item = itemRepository.findById(itemDto.getItemId())
                    .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemDto.getItemId()));

            BigDecimal price = item.getPrice();

            BigDecimal itemTotal = price.multiply(BigDecimal.valueOf(itemDto.getCount()));
            totalPrice = totalPrice.add(itemTotal);

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .item(item)
                    .count(itemDto.getCount())
                    .price(price)
                    .build();

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(order);

        return OrderResponseToDto(savedOrder);
    }

    private OrderResponseDto OrderResponseToDto(Order order) {
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