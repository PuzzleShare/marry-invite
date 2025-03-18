package com.marry_invite.users.exceptions;

public class JwtTokenException extends RuntimeException{
    public JwtTokenException(String message, Throwable cause){
        super(message, cause);
    }
}
