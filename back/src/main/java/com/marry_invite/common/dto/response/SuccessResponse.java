package com.marry_invite.common.dto.response;

public record SuccessResponse (
        String success
) implements ResponseMessage{
    public static SuccessResponse DEFAULT = new SuccessResponse("true");
}
