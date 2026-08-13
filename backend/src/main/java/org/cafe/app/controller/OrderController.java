package org.cafe.app.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.*;
import org.cafe.app.entity.Order;
import org.cafe.app.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<OrderResponseDto>> getAllOrders (Pageable pageable) {
        return ResponseEntity.ok(orderService.getAllOrders(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDto> getOrder (@Valid @PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrder(id));
    }

    @PostMapping("/submit-order")
    public ResponseEntity<OrderResponseDto> createOrder(
            @Valid @RequestBody OrderRequestDto requestDto) {

        OrderResponseDto response = orderService.createOrder(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats () {
        return ResponseEntity.ok(orderService.getDashboardStats());
    }

    @GetMapping("/last-five")
    public ResponseEntity<List<OrderPriceDto>> getLastFiveOrdersPrices() {
        return ResponseEntity.ok(orderService.getLastFiveOrdersPrices());
    }

    @GetMapping("/statistics/monthly-sales")
    public ResponseEntity<List<MonthlySalesDto>> getMonthlySales(@RequestParam int year) {
        return ResponseEntity.ok(orderService.getMonthlySales(year));
    }
}
