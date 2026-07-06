package org.cafe.app.controller;

import lombok.Data;
import org.cafe.app.dto.ItemDto;
import org.cafe.app.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@Data
@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<List<ItemDto>> getItems () {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getItem (@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }
}
