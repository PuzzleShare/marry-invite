package com.marry_invite.common.handler;

import com.marry_invite.common.dto.response.ErrorResponse;
import com.marry_invite.common.error.DocumentNotFoundException;
import com.marry_invite.users.exceptions.JwtTokenException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.AuthenticationException;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleOAuth2AuthenticationException(
            AuthenticationException e
    ){
        return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
    }
    @ExceptionHandler(JwtTokenException.class)
    public ResponseEntity<ErrorResponse> handleJwtTokenException(
            JwtTokenException e
    ){
        return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
    }
    @ExceptionHandler(DocumentNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleDocumentNotFoundException(
            DocumentNotFoundException e
    ){
        return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
    }
}
