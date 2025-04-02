package com.marry_invite.common.dto.response;

public record ErrorResponse(
        String message
) implements ResponseMessage{
    @Override
    public String toString() {
        return "{\"message\":\"" + message +"\"}";
    }
}
