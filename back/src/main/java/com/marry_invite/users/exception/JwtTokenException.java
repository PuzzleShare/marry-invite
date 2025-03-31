package com.marry_invite.users.exception;

import com.marry_invite.common.exception.CustomException;

public class JwtTokenException extends CustomException {
    public JwtTokenException(String message, Throwable cause){
        super(message, cause);
    }
}
