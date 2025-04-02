package com.marry_invite.comment.document;

import com.marry_invite.comment.dto.request.CommentRequest;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document("comments")
public class Comments {
    @Id
    private String id;
    private String inviteId;
    private String pw;
    private String text;
    private String name;

    public static Comments of(CommentRequest data, String inviteId){
        return Comments.builder()
                .inviteId(inviteId)
                .name(data.name())
                .pw(data.pw())
                .text(data.text())
                .build();
    }
}
