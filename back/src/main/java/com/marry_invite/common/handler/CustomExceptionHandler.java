package com.marry_invite.common.handler;

import com.marry_invite.common.dto.response.ErrorResponse;
import com.marry_invite.common.exception.CustomException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.AuthenticationException;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleOAuth2AuthenticationException(
            AuthenticationException e
    ) {
        return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleJwtTokenException(
            CustomException e
    ) {
        return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(
            AccessDeniedException e
    ) {
        return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
    }
}
