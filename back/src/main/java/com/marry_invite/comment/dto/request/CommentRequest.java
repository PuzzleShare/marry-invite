package com.marry_invite.comment.dto.request;


public record CommentRequest(
        String pw,
        String text,
        String name
) {
}
