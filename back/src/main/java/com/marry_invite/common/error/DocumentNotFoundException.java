package com.marry_invite.common.error;

public class DocumentNotFoundException extends RuntimeException {
    public DocumentNotFoundException(){
        super("정보를 찾을 수 없습니다.");
    }
    public DocumentNotFoundException(String message){
        super(message);
    }
}
