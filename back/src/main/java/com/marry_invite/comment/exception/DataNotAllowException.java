package com.marry_invite.comment.exception;

import com.marry_invite.common.exception.CustomException;

public class DataNotAllowException extends CustomException {
    public DataNotAllowException(String message) {
        super(message);
    }
}
