package org.cafe.app.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        log.warn("⚠️ Not found | {} | Path: {}", ex.getMessage(), request.getRequestURI());
        return build(ex.getStatus(), ex.getErrorCode(), ex.getMessage(), request.getRequestURI(), null);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException ex, HttpServletRequest request) {
        log.warn("⚠️ Bad request | {} | Path: {}", ex.getMessage(), request.getRequestURI());
        return build(ex.getStatus(), ex.getErrorCode(), ex.getMessage(), request.getRequestURI(), null);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedException ex, HttpServletRequest request) {
        log.warn("🚫 Unauthorized | {} | Path: {}", ex.getMessage(), request.getRequestURI());
        return build(ex.getStatus(), ex.getErrorCode(), ex.getMessage(), request.getRequestURI(), null);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex, HttpServletRequest request) {
        log.warn("🚫 Bad credentials | Path: {}", request.getRequestURI());
        return build(HttpStatus.UNAUTHORIZED, "BAD_CREDENTIALS",
                "ایمیل یا رمز عبور اشتباه است!", request.getRequestURI(), null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            errors.put(fe.getField(), fe.getDefaultMessage());
        }
        log.warn("⚠️ Validation failed | Path: {} | Errors: {}", request.getRequestURI(), errors);
        return build(HttpStatus.BAD_REQUEST, "VALIDATION_ERROR",
                "Validation failed", request.getRequestURI(), errors);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex, HttpServletRequest request) {
        log.error("❌ Unhandled exception | Path: {} | Type: {} | Message: {}",
                request.getRequestURI(), ex.getClass().getSimpleName(), ex.getMessage(), ex);
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR",
                "خطای غیرمنتظره‌ای رخ داد.", request.getRequestURI(), null);
    }

    private ResponseEntity<ErrorResponse> build(HttpStatus status, String error,
                                                String message, String path,
                                                Map<String, String> validationErrors) {
        return ResponseEntity.status(status).body(
                ErrorResponse.builder()
                        .success(false)
                        .status(status.value())
                        .error(error)
                        .message(message)
                        .path(path)
                        .timestamp(LocalDateTime.now())
                        .validationErrors(validationErrors)
                        .build()
        );
    }
}