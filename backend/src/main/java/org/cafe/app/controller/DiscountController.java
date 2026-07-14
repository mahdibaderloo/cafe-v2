package org.cafe.app.controller;

import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.DiscountResponseDto;
import org.cafe.app.entity.Discount;
import org.cafe.app.service.DiscountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/discount")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DiscountController {

    private final DiscountService discountService;

    @GetMapping("/all")
    public ResponseEntity<List<DiscountResponseDto>> getAllDiscounts () {
        return ResponseEntity.ok(discountService.getAllDiscounts());
    }

}
