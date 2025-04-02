package com.marry_invite.comment.dto.response;

import com.marry_invite.comment.document.Comments;

public record CommentResponse(
        String commentId,
        String text,
        String name
) {
    public static CommentResponse of(Comments comments){
        return new CommentResponse(
                comments.getId(), 
                comments.getText(),
                comments.getName()
        );
    }
}
