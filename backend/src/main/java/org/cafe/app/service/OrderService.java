package org.cafe.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.time4j.PlainDate;
import net.time4j.calendar.PersianCalendar;
import net.time4j.calendar.PersianMonth;
import org.apache.commons.lang3.RandomStringUtils;
import org.cafe.app.dto.*;
import org.cafe.app.entity.Item;
import org.cafe.app.entity.Order;
import org.cafe.app.entity.OrderItem;
import org.cafe.app.repository.ItemRepository;
import org.cafe.app.repository.OrderRepository;
import org.cafe.app.utils.PersianDateUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemService orderItemService;
    private final ItemRepository itemRepository;
    private final PersianDateUtil persianDateUtil;

    private static final String[] MONTH_NAMES = {
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند"
    };

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

    public Page<OrderResponseDto> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable).map(this::OrderResponseToDto);
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
                .orderCode(order.getOrderCode())
                .username(order.getUsername())
                .phoneNumber(order.getPhoneNumber())
                .takeAway(order.isTakeAway())
                .description(order.getDescription())
                .items(order.getItems().stream()
                        .map(this::convertOrderItemToDto)
                        .collect(Collectors.toList()))
                .build();
    }

    private OrderItemResponseDto convertOrderItemToDto(OrderItem orderItem) {
        Item item = orderItem.getItem();
        return OrderItemResponseDto.builder()
                .itemId(item.getId())
                .itemName(item.getProductName())
                .itemDescription(item.getDescription())
                .categoryName(item.getCategory().getName())
                .price(orderItem.getPrice())
                .count(orderItem.getCount())
                .subtotal(BigDecimal.valueOf((long) orderItem.getPrice().intValue() * orderItem.getCount()))
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

    public List<MonthlySalesDto> getMonthlySales(int jalaliYear) {

        List<MonthlySalesDto> result = new ArrayList<>();

        for (int month = 1; month <= 12; month++) {

            LocalDateTime start = jalaliToGregorianStart(jalaliYear, month);

            LocalDateTime end =
                    jalaliToGregorianStart(
                            month == 12 ? jalaliYear + 1 : jalaliYear,
                            month == 12 ? 1 : month + 1
                    );

            BigDecimal sales = orderRepository.getSalesBetween(start, end);

            result.add(
                    new MonthlySalesDto(
                            month,
                            MONTH_NAMES[month - 1],
                            sales
                    )
            );
        }

        return result;
    }

    private LocalDateTime jalaliToGregorianStart(int year, int month) {

        PersianMonth persianMonth = PersianMonth.values()[month - 1];

        PersianCalendar persianDate = PersianCalendar.of(
                year,
                persianMonth,
                1
        );

        PlainDate gregorianDate =
                persianDate.transform(PlainDate.axis());

        System.out.println(
                "INPUT: " + year + "/" + month + "/1"
                        + " | PERSIAN: " + persianDate
                        + " | GREGORIAN: " + gregorianDate
        );

        return LocalDateTime.of(
                gregorianDate.getYear(),
                gregorianDate.getMonth(),
                gregorianDate.getDayOfMonth(),
                0,
                0
        );
    }
}