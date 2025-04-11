package com.marry_invite.invite.document.block;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.HashMap;


@Data
@SuperBuilder
@NoArgsConstructor
public class DataBlock extends AbstractBlock {

    public static DataBlockBuilder<?, ?> guestBookBuilder(){
        return DataBlock.builder()
                .type("guest_book")
                .content(new ArrayList<>())
                .style(new HashMap<>())
                .shape(new HashMap<>());
    }
    public static DataBlockBuilder<?, ?> calendarBuilder(){
        return DataBlock.builder()
                .type("calendar")
                .content(new ArrayList<>())
                .style(new HashMap<>())
                .shape(new HashMap<>());
    }
    public static DataBlockBuilder<?, ?> mapBuilder(){
        return DataBlock.builder()
                .type("map")
                .content(new ArrayList<>())
                .style(new HashMap<>())
                .shape(new HashMap<>());
    }
}
