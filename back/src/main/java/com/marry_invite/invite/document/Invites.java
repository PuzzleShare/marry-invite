package com.marry_invite.invite.document;

import com.marry_invite.invite.document.block.Block;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@Builder
@ToString
public class Invites {
    @Id
    private String id;
    private String userId;
    private String imageUrl;
    private String inviteId;
    private Block data;
}
