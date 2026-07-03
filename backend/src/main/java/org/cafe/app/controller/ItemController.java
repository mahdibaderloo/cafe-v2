package org.cafe.app.controller;

import org.cafe.app.dto.ItemDto;
import org.cafe.app.repository.ItemRepository;
import org.cafe.app.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemRepository itemRepository, ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<List<ItemDto>> getItems () {
        return ResponseEntity.ok(itemService.getAllItems());
    }
}
