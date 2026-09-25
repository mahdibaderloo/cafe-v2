package org.cafe.app.service;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.cafe.app.dto.ItemRequestDto;
import org.cafe.app.dto.ItemResponseDto;
import org.cafe.app.entity.Category;
import org.cafe.app.entity.Item;
import org.cafe.app.repository.CategoryRepository;
import org.cafe.app.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    public ItemService(ItemRepository itemRepository, CategoryRepository categoryRepository) {
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
        log.info("🛠️ ItemService initialized successfully");
    }

    public List<ItemResponseDto> getAllItems() {
        log.info("📦 Fetching all items...");

        try {
            List<ItemResponseDto> items = itemRepository.findAll()
                    .stream()
                    .map(this::toDto)
                    .toList();

            log.info("✅ Successfully fetched {} item(s)", items.size());

            return items;
        } catch (Exception e) {
            log.error("❌ Failed to fetch all items: {}", e.getMessage(), e);
            throw e;
        }
    }

    public List<ItemResponseDto> getItemsByCategoryId(Long id) {
        log.info("📂 Fetching items for category ID: {}", id);

        try {
            List<ItemResponseDto> items = itemRepository.findByCategoryId(id)
                    .stream()
                    .map(this::toDto)
                    .toList();

            log.info("✅ Successfully fetched {} item(s) for category ID: {}", items.size(), id);

            return items;
        } catch (Exception e) {
            log.error("❌ Failed to fetch items for category ID: {} - {}", id, e.getMessage(), e);
            throw e;
        }
    }

    public ItemResponseDto getItemById(Long id) {
        log.info("🔍 Fetching item by ID: {}", id);

        try {
            ItemResponseDto item = itemRepository.findById(id)
                    .map(this::toDto)
                    .orElseThrow(() -> new RuntimeException("Item not found"));

            log.info("✅ Item found | ID: {} | Name: {}", id, item.getProductName());
            return item;
        } catch (Exception e) {
            log.warn("⚠️ Failed to fetch item | ID: {} | Reason: {}", id, e.getMessage());
            throw e;
        }
    }

    private ItemResponseDto toDto(Item item) {
        log.debug("🔄 Mapping item to DTO | ID: {} | Name: {}", item.getId(), item.getProductName());

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
        log.info(
                "➕ Creating new item | Name: {} | Category ID: {} | Price: {}",
                requestDto.getProductName(),
                requestDto.getCategoryId(),
                requestDto.getPrice()
        );

        try {
            Category category = categoryRepository.getReferenceById(requestDto.getCategoryId());

            Item item = Item.builder()
                    .productName(requestDto.getProductName())
                    .image(requestDto.getImage())
                    .price(requestDto.getPrice())
                    .description(requestDto.getDescription())
                    .category(category)
                    .build();

            Item savedItem = itemRepository.save(item);

            log.info("✅ Item created successfully | ID: {} | Name: {}", savedItem.getId(), savedItem.getProductName());
            return toDto(savedItem);
        } catch (Exception e) {
            log.error("❌ Failed to create item | Name: {} | Error: {}", requestDto.getProductName(), e.getMessage(), e);
            throw e;
        }
    }

    public ItemResponseDto updateItem(Long id, @Valid ItemRequestDto requestDto) {
        log.info("✏️ Updating item | ID: {} | New name: {}", id, requestDto.getProductName());

        try {
            Item existingItem = itemRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("آیتم با شناسه " + id + " یافت نشد"));

            existingItem.setProductName(requestDto.getProductName());
            existingItem.setImage(requestDto.getImage());
            existingItem.setPrice(requestDto.getPrice());
            existingItem.setDescription(requestDto.getDescription());

            Item updatedItem = itemRepository.save(existingItem);

            log.info("✅ Item updated successfully | ID: {} | Name: {}", updatedItem.getId(), updatedItem.getProductName());
            return toDto(updatedItem);
        } catch (Exception e) {
            log.error("❌ Failed to update item | ID: {} | Error: {}", id, e.getMessage(), e);
            throw e;
        }
    }

    public String deleteItem(Long id) {
        log.info("🗑️ Deleting item | ID: {}", id);

        try {
            if (!itemRepository.existsById(id)) {
                log.warn("⚠️ Cannot delete item because it was not found | ID: {}", id);
                throw new RuntimeException("آیتم با شناسه " + id + " یافت نشد");
            }

            itemRepository.deleteById(id);

            log.info("✅ Item deleted successfully | ID: {}", id);
            return "آیتم حذف شد";
        } catch (Exception e) {
            log.error("❌ Failed to delete item | ID: {} | Error: {}", id, e.getMessage(), e);
            throw e;
        }
    }
}