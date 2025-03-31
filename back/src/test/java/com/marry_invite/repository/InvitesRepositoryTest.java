package com.marry_invite.repository;

import com.marry_invite.common.exception.DocumentNotFoundException;
import com.marry_invite.invite.document.Invites;
import com.marry_invite.invite.document.block.DataBlock;
import com.marry_invite.invite.document.block.RootBlock;
import com.marry_invite.invite.document.style.BlocksStyle;
import com.marry_invite.invite.repository.InvitesRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.UUID;

@SpringBootTest
public class InvitesRepositoryTest {
    @Autowired
    private InvitesRepository invitesRepository;

    @Test
    @DisplayName("save test")
    public void saveTest(){
        DataBlock guestBook = DataBlock.guestBookBuilder().blockName("방명록").build();
        DataBlock calendar = DataBlock.calendarBuilder().blockName("달력").build();
        DataBlock map = DataBlock.mapBuilder().blockName("지도").build();
        RootBlock rootBlock = RootBlock.builder()
                .type("root")
                .style(new BlocksStyle())
                .content(new ArrayList<>())
                .blockName("root")
                .bgm("")
                .title("").build();
        rootBlock.getContent().add(guestBook);
        rootBlock.getContent().add(calendar);
        rootBlock.getContent().add(map);

        Invites invites = Invites.builder()
                .userId("minjagot")
                .inviteId(LocalDate.now()
                        .toString()
                        .replace("-", "")
                        + UUID.randomUUID()
                ).imageUrl("")
                .data(rootBlock)
                .build();

        Invites saved = invitesRepository.save(invites);
        System.out.println(saved);
    }

    @Test
    @DisplayName("find by inviteId test")
    public void findByIdTest(){
        Invites invites = invitesRepository.findByInviteId("202503275ede4a77-4e17-4e5b-81a3-40041c7f3fe3")
                .orElseThrow(() -> new DocumentNotFoundException());
        System.out.println(invites);
    }
}
