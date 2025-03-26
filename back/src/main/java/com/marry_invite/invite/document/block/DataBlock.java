package com.marry_invite.invite.document.block;

import com.marry_invite.invite.document.style.CalendarStyle;
import com.marry_invite.invite.document.style.GuestBookStyle;
import com.marry_invite.invite.document.style.MapStyle;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;


@Data
@SuperBuilder
@NoArgsConstructor
public class DataBlock extends AbstractBlock {

    public static DataBlockBuilder<?, ?> guestBookBuilder(){
        return DataBlock.builder()
                .type("guest_book")
                .content(new ArrayList<>())
                .style(new GuestBookStyle());
    }
    public static DataBlockBuilder<?, ?> calendarBuilder(){
        return DataBlock.builder()
                .type("calendar")
                .content(new ArrayList<>())
                .style(new CalendarStyle());
    }
    public static DataBlockBuilder<?, ?> mapBuilder(){
        return DataBlock.builder()
                .type("map")
                .content(new ArrayList<>())
                .style(new MapStyle());
    }
}
