package org.cafe.app.service;

import org.cafe.app.dto.ItemDto;
import org.cafe.app.entity.Item;
import org.cafe.app.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<ItemDto> getAllItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public List<ItemDto> getItemsByCategory(Long id) {
        return itemRepository.findByCategory(id)
                .stream()
                .map(this::toDto)
                .toList();
    }

    public ItemDto getItemById(Long id) {
        return itemRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    private ItemDto toDto(Item item) {
        return new ItemDto(
                item.getId(),
                item.getProductName(),
                item.getPrice(),
                item.getDescription(),
                item.getCategory().getId(),
                item.getCategory().getName(),
                item.getImage()
        );
    }
}