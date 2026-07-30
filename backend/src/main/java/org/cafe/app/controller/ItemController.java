package org.cafe.app.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.ItemRequestDto;
import org.cafe.app.dto.ItemResponseDto;
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

    @GetMapping("/category-id/{id}")
    public ResponseEntity<List<ItemResponseDto>> getItems (@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemsByCategoryId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponseDto> getItem (@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @PostMapping("/create-item")
    public ResponseEntity<ItemResponseDto> createItem(@Valid @RequestBody ItemRequestDto requestDto) {
        ItemResponseDto response = itemService.createItem(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponseDto> updateItem(
            @PathVariable Long id,
            @Valid @RequestBody ItemRequestDto requestDto) {
        ItemResponseDto response = itemService.updateItem(id, requestDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
