package com.marry_invite.invite.dto.response;

import com.marry_invite.invite.document.Invites;
import com.marry_invite.invite.document.block.Block;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InviteResponse {
    private String id;
    private String userId;
    private String imageUrl;
    private String inviteId;
    private Block data;
    public static InviteResponse of(Invites invites){
        return InviteResponse.builder()
                .id(invites.getId())
                .userId(invites.getUserId())
                .imageUrl(invites.getImageUrl())
                .inviteId(invites.getInviteId())
                .data(invites.getData())
                .build();
    }
}
