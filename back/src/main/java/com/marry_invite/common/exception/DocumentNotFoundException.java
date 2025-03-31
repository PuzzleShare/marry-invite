package com.marry_invite.common.exception;

public class DocumentNotFoundException extends CustomException {
    public DocumentNotFoundException(){
        super("정보를 찾을 수 없습니다.");
    }
    public DocumentNotFoundException(String message){
        super(message);
    }
}
