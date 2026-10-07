package org.cafe.app.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.ItemRequestDto;
import org.cafe.app.dto.ItemResponseDto;
import org.cafe.app.exception.ForbiddenException;
import org.cafe.app.exception.UnauthorizedException;
import org.cafe.app.security.JwtService;
import org.cafe.app.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;
    private final JwtService jwtService;

    @GetMapping("/category-id/{id}")
    public ResponseEntity<List<ItemResponseDto>> getItems (@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemsByCategoryId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponseDto> getItem (@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @PostMapping("/create-item")
    public ResponseEntity<ItemResponseDto> createItem(@RequestHeader("Authorization") String header, @Valid @RequestBody ItemRequestDto requestDto) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username.isEmpty()) {
            throw new  ForbiddenException("لطفا دوباره وارد شوید");
        }

        ItemResponseDto response = itemService.createItem(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ItemResponseDto> updateItem(@RequestHeader("Authorization") String header, @PathVariable Long id, @Valid @RequestBody ItemRequestDto requestDto) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username.isEmpty()) {
            throw new  ForbiddenException("لطفا دوباره وارد شوید");
        }

        ItemResponseDto response = itemService.updateItem(id, requestDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteItem(@RequestHeader("Authorization") String header, @PathVariable Long id) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username.isEmpty()) {
            throw new ForbiddenException("لطفا دوباره وارد شوید");
        }

        return ResponseEntity.ok(itemService.deleteItem(id));
    }

    private String getToken (String header) {
        String token = header.substring(7);

        if (token.isEmpty()) {
            throw new UnauthorizedException("نشست شما منقضی شده");
        }
        return token;
    }

}
