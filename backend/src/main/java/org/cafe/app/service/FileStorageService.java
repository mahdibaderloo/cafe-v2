package org.cafe.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String uploadItemImage(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is empty.");
        }

        String contentType = file.getContentType();

        if (contentType == null || !contentType.startsWith("image/")) {
            throw new RuntimeException("Only image files are allowed.");
        }

        String extension = getExtension(file.getOriginalFilename());

        String fileName = UUID.randomUUID() + extension;

        try {
            Path directory = Paths.get(uploadDir).toAbsolutePath().normalize();

            Files.createDirectories(directory);

            Path filePath = directory.resolve(fileName);

            file.transferTo(filePath);

            return fileName;

        } catch (IOException e) {
            throw new RuntimeException("Could not save file.", e);
        }
    }

    private String getExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) {
            return "";
        }

        return fileName.substring(
                fileName.lastIndexOf(".")
        ).toLowerCase();
    }
}