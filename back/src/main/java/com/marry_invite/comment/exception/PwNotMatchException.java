package com.marry_invite.comment.exception;

import com.marry_invite.common.exception.CustomException;

public class PwNotMatchException extends CustomException {
    public PwNotMatchException(String message) {
        super(message);
    }
    public PwNotMatchException() {
        super("비밀번호가 일치하지 않습니다.");
    }
}
