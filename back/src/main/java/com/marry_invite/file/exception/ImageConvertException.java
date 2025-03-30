package com.marry_invite.file.exception;

import com.marry_invite.common.exception.CustomException;

public class ImageConvertException extends CustomException {
    public ImageConvertException(String message) {
        super(message);
    }
    public ImageConvertException() {
        super("이미지 변환에 실패하였습니다.");
    }
}
