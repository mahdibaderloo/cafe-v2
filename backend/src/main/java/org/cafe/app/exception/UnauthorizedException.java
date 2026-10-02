package org.cafe.app.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class UnauthorizedException extends RuntimeException {

    private final HttpStatus status = HttpStatus.UNAUTHORIZED;
    private final String errorCode = "UNAUTHORIZED";

    public UnauthorizedException(String message) {
        super(message);
    }
}