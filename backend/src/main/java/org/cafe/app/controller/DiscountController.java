package org.cafe.app.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.DiscountRequestDto;
import org.cafe.app.dto.DiscountResponseDto;
import org.cafe.app.service.DiscountService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/discount")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DiscountController {

    private final DiscountService discountService;

    @GetMapping("/all")
    public ResponseEntity<Page<DiscountResponseDto>> getAllDiscounts (Pageable pageable) {
        return ResponseEntity.ok(discountService.getAllDiscounts(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<DiscountResponseDto>> getDiscount (@Valid @PathVariable Long id) {
        return ResponseEntity.ok(discountService.getDiscount(id));
    }

    @PostMapping("/submit-code")
    public ResponseEntity<DiscountResponseDto> generateNewCode (@Valid @RequestBody DiscountRequestDto request) {
        DiscountResponseDto response = discountService.generateDiscountCode(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
