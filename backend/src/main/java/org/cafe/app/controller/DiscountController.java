package org.cafe.app.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.DiscountRequestDto;
import org.cafe.app.dto.DiscountResponseDto;
import org.cafe.app.exception.ForbiddenException;
import org.cafe.app.exception.UnauthorizedException;
import org.cafe.app.security.JwtService;
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
    private final JwtService jwtService;

    @GetMapping("/all")
    public ResponseEntity<Page<DiscountResponseDto>> getAllDiscounts(@RequestHeader("Authorization") String header, Pageable pageable) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username == null || username.isBlank()) {
            throw new ForbiddenException("لطفا دوباره وارد شوید");
        }

        return ResponseEntity.ok(discountService.getAllDiscounts(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<DiscountResponseDto>> getDiscount(@RequestHeader("Authorization") String header, @Valid @PathVariable Long id) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username == null || username.isBlank()) {
            throw new ForbiddenException("لطفا دوباره وارد شوید");
        }

        return ResponseEntity.ok(discountService.getDiscount(id));
    }

    @PostMapping("/submit-code")
    public ResponseEntity<DiscountResponseDto> generateNewCode(@RequestHeader("Authorization") String header, @Valid @RequestBody DiscountRequestDto request) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username == null || username.isBlank()) {
            throw new ForbiddenException("لطفا دوباره وارد شوید");
        }

        DiscountResponseDto response = discountService.generateDiscountCode(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/expire-code/{id}")
    public ResponseEntity<DiscountResponseDto> expireCode(@RequestHeader("Authorization") String header, @PathVariable Long id) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username == null || username.isBlank()) {
            throw new ForbiddenException("لطفا دوباره وارد شوید");
        }

        DiscountResponseDto response = discountService.expireCode(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/use-code/{code}")
    public ResponseEntity<DiscountResponseDto> useCode(@PathVariable String code) {
        DiscountResponseDto response = discountService.useCode(code);
        return ResponseEntity.ok(response);
    }

    private String getToken(String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            throw new UnauthorizedException("نشست شما منقضی شده");
        }

        String token = header.substring(7);

        if (token.isBlank()) {
            throw new UnauthorizedException("نشست شما منقضی شده");
        }

        return token;
    }
}