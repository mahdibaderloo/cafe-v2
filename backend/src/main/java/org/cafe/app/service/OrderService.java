package org.cafe.app.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.aspectj.weaver.ast.Or;
import org.cafe.app.dto.*;
import org.cafe.app.entity.Item;
import org.cafe.app.entity.Order;
import org.cafe.app.entity.OrderItem;
import org.cafe.app.repository.ItemRepository;
import org.cafe.app.repository.OrderRepository;
import org.cafe.app.utils.PersianDateUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemService orderItemService;
    private final ItemRepository itemRepository;
    private final PersianDateUtil persianDateUtil;

    public DashboardStatsDto getDashboardStats() {

        Long totalOrders = orderRepository.countTotalOrders();

        LocalDateTime startOfMonth = persianDateUtil.getCurrentPersianMonthStart();
        LocalDateTime now = LocalDateTime.now();
        BigDecimal monthlySales = orderRepository.sumSalesBetweenDates(startOfMonth, now);
        if (monthlySales == null) monthlySales = BigDecimal.ZERO;

        List<Object[]> topProductResult = orderRepository.findTopProduct();
        String topProduct = "محصولی ثبت نشده";
        Long topProductCount = 0L;

        if (!topProductResult.isEmpty()) {
            Object[] result = topProductResult.getFirst();
            topProduct = (String) result[0];
            topProductCount = (Long) result[1];
        }

        return DashboardStatsDto.builder()
                .totalOrders(totalOrders)
                .monthlySales(monthlySales)
                .topProduct(topProduct)
                .topProductCount(topProductCount)
                .build();
    }

    public List<OrderResponseDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream()
                .map(this::OrderResponseToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponseDto createOrder(OrderRequestDto requestDto) {

        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMddHHmmss"));
        String randomPart = RandomStringUtils.secure().nextNumeric(2);
        String orderCode = timestamp + randomPart;

        Order order = Order.builder()
                .createdAt(LocalDateTime.now())
                .username(requestDto.getUsername())
                .phoneNumber(requestDto.getPhoneNumber())
                .takeAway(requestDto.isTakeAway())
                .description(requestDto.getDescription())
                .orderCode(orderCode)
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

    public OrderResponseDto getOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id:" + id));

        return OrderResponseToDto(order);
    }

    public List<OrderPriceDto> getLastFiveOrdersPrices() {
        List<Order> lastFiveOrders = orderRepository.findTop5ByOrderByIdDesc();

        return lastFiveOrders.stream()
                .map(order -> new OrderPriceDto(order.getId(), order.getTotalPrice()))
                .collect(Collectors.toList());
    }
}