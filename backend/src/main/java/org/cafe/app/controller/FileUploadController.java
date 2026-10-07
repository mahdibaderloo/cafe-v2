package org.cafe.app.controller;

import lombok.RequiredArgsConstructor;
import org.cafe.app.dto.ImageUploadResponseDto;
import org.cafe.app.exception.ForbiddenException;
import org.cafe.app.exception.UnauthorizedException;
import org.cafe.app.security.JwtService;
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
    private final JwtService jwtService;

    @PostMapping(
            value = "/items",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ImageUploadResponseDto> uploadItemImage(@RequestHeader("Authorization") String header, @RequestParam("file") MultipartFile file) {
        String token = getToken(header);
        String username = jwtService.extractUsername(token);

        if (username.isEmpty()) {
            throw new ForbiddenException("لطفا دوباره وارد شوید");
        }

        String fileName = fileStorageService.uploadItemImage(file);
        return ResponseEntity.ok(new ImageUploadResponseDto(fileName, "/uploads/items/" + fileName));
    }

    private String getToken (String header) {
        String token = header.substring(7);

        if (token.isEmpty()) {
            throw new UnauthorizedException("نشست شما منقضی شده");
        }
        return token;
    }
}