package org.cafe.app.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.*;
import org.cafe.app.entity.Order;
import org.cafe.app.exception.ForbiddenException;
import org.cafe.app.exception.UnauthorizedException;
import org.cafe.app.security.JwtService;
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
    private final JwtService jwtService;

    @GetMapping
    public ResponseEntity<Page<OrderResponseDto>> getAllOrders (@RequestHeader("Authorization") String header, Pageable pageable) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username.isEmpty()) {
            throw new  ForbiddenException("لطفا دوباره وارد شوید");
        }

        return ResponseEntity.ok(orderService.getAllOrders(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDto> getOrder (@RequestHeader("Authorization") String header, @Valid @PathVariable Long id) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username.isEmpty()) {
            throw new  ForbiddenException("لطفا دوباره وارد شوید");
        }

        return ResponseEntity.ok(orderService.getOrder(id));
    }

    @PostMapping("/submit-order")
    public ResponseEntity<OrderResponseDto> createOrder(@Valid @RequestBody OrderRequestDto requestDto) {
        OrderResponseDto response = orderService.createOrder(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats (@RequestHeader("Authorization") String header) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username.isEmpty()) {
            throw new  ForbiddenException("لطفا دوباره وارد شوید");
        }

        return ResponseEntity.ok(orderService.getDashboardStats());
    }

    @GetMapping("/last-five")
    public ResponseEntity<List<OrderPriceDto>> getLastFiveOrdersPrices(@RequestHeader("Authorization") String header) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username.isEmpty()) {
            throw new  ForbiddenException("لطفا دوباره وارد شوید");
        }

        return ResponseEntity.ok(orderService.getLastFiveOrdersPrices());
    }

    @GetMapping("/statistics/monthly-sales")
    public ResponseEntity<List<MonthlySalesDto>> getMonthlySales(@RequestHeader("Authorization") String header, @RequestParam int year) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username.isEmpty()) {
            throw new ForbiddenException("لطفا دوباره وارد شوید");
        }

        return ResponseEntity.ok(orderService.getMonthlySales(year));
    }

    private String getToken (String header) {
        String token = header.substring(7);

        if (token.isEmpty()) {
            throw new UnauthorizedException("نشست شما منقضی شده");
        }
        return token;
    }

}
