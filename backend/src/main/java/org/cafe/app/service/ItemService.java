package org.cafe.app.service;

import jakarta.validation.Valid;
import org.apache.commons.lang3.RandomStringUtils;
import org.cafe.app.dto.ItemRequestDto;
import org.cafe.app.dto.ItemResponseDto;
import org.cafe.app.dto.OrderItemRequestDto;
import org.cafe.app.entity.Category;
import org.cafe.app.entity.Item;
import org.cafe.app.entity.Order;
import org.cafe.app.entity.OrderItem;
import org.cafe.app.repository.CategoryRepository;
import org.cafe.app.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    public ItemService(ItemRepository itemRepository, CategoryRepository categoryRepository) {
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ItemResponseDto> getAllItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public List<ItemResponseDto> getItemsByCategoryId(Long id) {
        return itemRepository.findByCategoryId(id)
                .stream()
                .map(this::toDto)
                .toList();
    }

    public ItemResponseDto getItemById(Long id) {
        return itemRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    private ItemResponseDto toDto(Item item) {
        return new ItemResponseDto(
                item.getId(),
                item.getProductName(),
                item.getPrice(),
                item.getDescription(),
                item.getCategory().getId(),
                item.getCategory().getName(),
                item.getImage()
        );
    }

    public ItemResponseDto createItem(@Valid ItemRequestDto requestDto) {
        Category category = categoryRepository.getReferenceById(requestDto.getCategoryId());

        Item item = Item.builder()
                .productName(requestDto.getProductName())
                .image(requestDto.getImage())
                .price(requestDto.getPrice())
                .description(requestDto.getDescription())
                .category(category)
                .build();

        Item savedItem = itemRepository.save(item);
        return toDto(savedItem);
    }

    public ItemResponseDto updateItem(Long id, @Valid ItemRequestDto requestDto) {
        Item existingItem = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("آیتم با شناسه " + id + " یافت نشد"));

        existingItem.setProductName(requestDto.getProductName());
        existingItem.setImage(requestDto.getImage());
        existingItem.setPrice(requestDto.getPrice());
        existingItem.setDescription(requestDto.getDescription());

        Item updatedItem = itemRepository.save(existingItem);
        return toDto(updatedItem);
    }

    public void deleteItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new RuntimeException("آیتم با شناسه " + id + " یافت نشد");
        }

        itemRepository.deleteById(id);
    }
}