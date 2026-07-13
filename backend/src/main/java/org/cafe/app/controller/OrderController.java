package org.cafe.app.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.OrderRequestDto;
import org.cafe.app.dto.OrderResponseDto;
import org.cafe.app.entity.Order;
import org.cafe.app.service.OrderService;
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
    public ResponseEntity<List<OrderResponseDto>> getAllOrders () {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PostMapping("/submit-order")
    public ResponseEntity<OrderResponseDto> createOrder(
            @Valid @RequestBody OrderRequestDto requestDto) {

        OrderResponseDto response = orderService.createOrder(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
