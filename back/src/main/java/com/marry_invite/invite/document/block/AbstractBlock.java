package com.marry_invite.invite.document.block;

import com.marry_invite.invite.document.style.Style;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public abstract class AbstractBlock implements Block{
    protected String type;
    protected String blockName;
    protected List<Block> content;
    protected Style style;
}
