package org.cafe.app.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ResourceNotFoundException extends RuntimeException {

    private final HttpStatus status = HttpStatus.NOT_FOUND;
    private final String errorCode = "RESOURCE_NOT_FOUND";

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue));
    }
}