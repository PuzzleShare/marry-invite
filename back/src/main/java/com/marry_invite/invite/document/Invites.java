package com.marry_invite.invite.document;

import com.marry_invite.invite.document.block.Block;
import com.marry_invite.invite.document.block.DataBlock;
import com.marry_invite.invite.document.block.RootBlock;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

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

    public static Invites defaultInvites(String userId){
        DataBlock guestBook = DataBlock.guestBookBuilder().blockName("방명록").build();
        DataBlock calendar = DataBlock.calendarBuilder().blockName("달력").build();
        DataBlock map = DataBlock.mapBuilder().blockName("지도").build();
        ArrayList<Block> blocks = new ArrayList<>();
        blocks.add(calendar);
        blocks.add(map);
        blocks.add(guestBook);
        RootBlock rootBlock = RootBlock.builder()
                .type("root")
                .style(new HashMap<>())
                .content(blocks)
                .blockName("root")
                .bgm("")
                .title("").build();

        return Invites.builder()
                .userId(userId)
                .inviteId(LocalDate.now()
                        .toString()
                        .replace("-", "")
                        + UUID.randomUUID()
                ).imageUrl("")
                .data(rootBlock)
                .build();
    }
}
