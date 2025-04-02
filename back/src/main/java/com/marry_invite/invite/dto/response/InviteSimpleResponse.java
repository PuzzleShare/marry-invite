package com.marry_invite.invite.dto.response;

import com.marry_invite.common.dto.response.ResponseMessage;

public record InviteSimpleResponse (
        String inviteId
) implements ResponseMessage {
}
