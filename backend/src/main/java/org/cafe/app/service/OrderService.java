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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

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
        log.info("📊 Fetching dashboard statistics...");

        try {
            Long totalOrders = orderRepository.countTotalOrders();

            LocalDateTime startOfMonth = persianDateUtil.getCurrentPersianMonthStart();
            LocalDateTime now = LocalDateTime.now();

            BigDecimal monthlySales = orderRepository.sumSalesBetweenDates(startOfMonth, now);

            if (monthlySales == null) {
                monthlySales = BigDecimal.ZERO;
            }

            List<Object[]> topProductResult = orderRepository.findTopProduct();

            String topProduct = "محصولی ثبت نشده";
            Long topProductCount = 0L;

            if (!topProductResult.isEmpty()) {
                Object[] result = topProductResult.getFirst();
                topProduct = (String) result[0];
                topProductCount = (Long) result[1];
            }

            log.info(
                    "✅ Dashboard statistics loaded | Total orders: {} | Monthly sales: {} | Top product: {} | Count: {}",
                    totalOrders,
                    monthlySales,
                    topProduct,
                    topProductCount
            );

            return DashboardStatsDto.builder()
                    .totalOrders(totalOrders)
                    .monthlySales(monthlySales)
                    .topProduct(topProduct)
                    .topProductCount(topProductCount)
                    .build();

        } catch (Exception e) {
            log.error("❌ Failed to fetch dashboard statistics: {}", e.getMessage(), e);
            throw e;
        }
    }

    public Page<OrderResponseDto> getAllOrders(Pageable pageable) {
        log.info("📋 Fetching orders | Page: {} | Size: {}",
                pageable.getPageNumber(), pageable.getPageSize());

        try {
            Pageable sortedPageable = pageable.getSort().isSorted()
                    ? pageable
                    : PageRequest.of(
                    pageable.getPageNumber(),
                    pageable.getPageSize(),
                    Sort.by("createdAt").descending()
            );

            Page<OrderResponseDto> orders = orderRepository
                    .findAll(sortedPageable)
                    .map(this::OrderResponseToDto);

            log.info("✅ Orders fetched | Returned: {} | Total: {}",
                    orders.getNumberOfElements(),
                    orders.getTotalElements());

            return orders;

        } catch (Exception e) {
            log.error("❌ Failed to fetch orders: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    public OrderResponseDto createOrder(OrderRequestDto requestDto) {
        log.info(
                "🛒 Creating new order | Username: {} | Phone: {} | Items: {}",
                requestDto.getUsername(),
                requestDto.getPhoneNumber(),
                requestDto.getItems().size()
        );

        try {
            String timestamp = LocalDateTime.now()
                    .format(DateTimeFormatter.ofPattern("MMddHHmmss"));

            String randomPart = RandomStringUtils.secure().nextNumeric(2);
            String orderCode = timestamp + randomPart;

            log.debug("🔑 Generated order code: {}", orderCode);

            Order order = Order.builder()
                    .createdAt(LocalDateTime.now())
                    .username(requestDto.getUsername())
                    .phoneNumber(requestDto.getPhoneNumber())
                    .takeAway(requestDto.isTakeAway())
                    .description(requestDto.getDescription())
                    .discountValue(requestDto.getDiscountValue())
                    .discountType(requestDto.getDiscountType())
                    .orderCode(orderCode)
                    .build();

            List<OrderItem> orderItems = new ArrayList<>();
            BigDecimal totalPrice = BigDecimal.ZERO;

            for (OrderItemRequestDto itemDto : requestDto.getItems()) {
                log.debug("🔎 Processing order item | Item ID: {} | Count: {}", itemDto.getItemId(), itemDto.getCount());

                Item item = itemRepository.findById(itemDto.getItemId())
                        .orElseThrow(() ->
                                new RuntimeException("Item not found with id: " + itemDto.getItemId()));

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

                log.debug(
                        "➕ Added item to order | Item: {} | Price: {} | Count: {} | Subtotal: {}",
                        item.getProductName(),
                        price,
                        itemDto.getCount(),
                        itemTotal
                );
            }

            order.setItems(orderItems);
            order.setTotalPrice(totalPrice);

            Order savedOrder = orderRepository.save(order);

            log.info(
                    "✅ Order created successfully | ID: {} | Code: {} | Total: {} | Items: {}",
                    savedOrder.getId(),
                    savedOrder.getOrderCode(),
                    savedOrder.getTotalPrice(),
                    orderItems.size()
            );

            return OrderResponseToDto(savedOrder);

        } catch (Exception e) {
            log.error("❌ Failed to create order | Username: {} | Error: {}", requestDto.getUsername(), e.getMessage(), e);
            throw e;
        }
    }

    private OrderResponseDto OrderResponseToDto(Order order) {
        log.debug("🔄 Converting order to DTO | ID: {} | Code: {}", order.getId(), order.getOrderCode());

        return OrderResponseDto.builder()
                .id(order.getId())
                .createdAt(order.getCreatedAt())
                .totalPrice(order.getTotalPrice())
                .orderCode(order.getOrderCode())
                .username(order.getUsername())
                .phoneNumber(order.getPhoneNumber())
                .takeAway(order.isTakeAway())
                .description(order.getDescription())
                .discountValue(order.getDiscountValue())
                .discountType(order.getDiscountType())
                .items(order.getItems()
                        .stream()
                        .map(this::convertOrderItemToDto)
                        .toList())
                .build();
    }

    private OrderItemResponseDto convertOrderItemToDto(OrderItem orderItem) {
        Item item = orderItem.getItem();

        BigDecimal subtotal = orderItem.getPrice().multiply(BigDecimal.valueOf(orderItem.getCount()));

        log.debug(
                "💰 Converting order item | Item ID: {} | Count: {} | Subtotal: {}",
                item.getId(),
                orderItem.getCount(),
                subtotal
        );

        return OrderItemResponseDto.builder()
                .itemId(item.getId())
                .itemName(item.getProductName())
                .itemDescription(item.getDescription())
                .categoryName(item.getCategory().getName())
                .price(orderItem.getPrice())
                .count(orderItem.getCount())
                .subtotal(subtotal)
                .build();
    }

    public OrderResponseDto getOrder(Long id) {
        log.info("🔍 Fetching order | ID: {}", id);

        try {
            Order order = orderRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

            log.info(
                    "✅ Order found | ID: {} | Code: {} | Total: {}",
                    order.getId(),
                    order.getOrderCode(),
                    order.getTotalPrice()
            );

            return OrderResponseToDto(order);

        } catch (Exception e) {
            log.warn("⚠️ Failed to fetch order | ID: {} | Reason: {}", id, e.getMessage());
            throw e;
        }
    }

    public List<OrderPriceDto> getLastFiveOrdersPrices() {
        log.info("💰 Fetching prices of the last five orders...");

        try {
            List<Order> lastFiveOrders = orderRepository.findTop5ByOrderByIdDesc();
            List<OrderPriceDto> result = lastFiveOrders.stream()
                    .map(order -> new OrderPriceDto(order.getId(), order.getTotalPrice())).toList();

            log.info("✅ Last five order prices fetched | Count: {}", result.size());
            return result;

        } catch (Exception e) {
            log.error("❌ Failed to fetch last five order prices: {}", e.getMessage(), e);
            throw e;
        }
    }

    public List<MonthlySalesDto> getMonthlySales(int jalaliYear) {
        log.info("📈 Calculating monthly sales for Jalali year: {}", jalaliYear);

        try {
            List<MonthlySalesDto> result = new ArrayList<>();

            for (int month = 1; month <= 12; month++) {
                LocalDateTime start = jalaliToGregorianStart(jalaliYear, month);

                LocalDateTime end =
                        jalaliToGregorianStart(
                                month == 12 ? jalaliYear + 1 : jalaliYear,
                                month == 12 ? 1 : month + 1
                        );

                BigDecimal sales = orderRepository.getSalesBetween(start, end);

                if (sales == null) {
                    sales = BigDecimal.ZERO;
                }

                log.debug("📅 Monthly sales | Year: {} | Month: {} | Sales: {}", jalaliYear, MONTH_NAMES[month - 1], sales);
                result.add(new MonthlySalesDto(month, MONTH_NAMES[month - 1], sales));
            }

            log.info("✅ Monthly sales calculated successfully | Year: {}", jalaliYear);
            return result;

        } catch (Exception e) {
            log.error("❌ Failed to calculate monthly sales | Year: {} | Error: {}", jalaliYear, e.getMessage(), e);
            throw e;
        }
    }

    private LocalDateTime jalaliToGregorianStart(int year, int month) {
        PersianMonth persianMonth = PersianMonth.values()[month - 1];
        PersianCalendar persianDate = PersianCalendar.of(year, persianMonth, 1);
        PlainDate gregorianDate = persianDate.transform(PlainDate.axis());

        log.debug(
                "🗓️ Converting Persian date to Gregorian | Input: {}/{}/1 | Persian: {} | Gregorian: {}",
                year,
                month,
                persianDate,
                gregorianDate
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