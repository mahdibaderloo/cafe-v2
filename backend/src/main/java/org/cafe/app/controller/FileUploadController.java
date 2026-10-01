package org.cafe.app.controller;

import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.ImageUploadResponseDto;
import org.cafe.app.service.FileStorageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/uploads")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileStorageService fileStorageService;

    @PostMapping(
            value = "/items",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ImageUploadResponseDto> uploadItemImage(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.uploadItemImage(file);
        return ResponseEntity.ok(new ImageUploadResponseDto(fileName, "/uploads/items/" + fileName));
    }
}