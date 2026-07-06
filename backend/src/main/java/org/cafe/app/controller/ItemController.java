package org.cafe.app.controller;

import lombok.Data;
import org.cafe.app.dto.ItemDto;
import org.cafe.app.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/category-id/{id}")
    public ResponseEntity<List<ItemDto>> getItems (@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemsByCategory(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getItem (@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }
}
