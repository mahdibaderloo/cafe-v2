package org.cafe.app.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BadRequestException extends RuntimeException {

    private final HttpStatus status = HttpStatus.BAD_REQUEST;
    private final String errorCode;

    public BadRequestException(String message) {
        super(message);
        this.errorCode = "BAD_REQUEST";
    }

    public BadRequestException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}