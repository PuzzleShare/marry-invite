package com.marry_invite.invite.document.block;

import com.marry_invite.invite.document.style.Style;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public abstract class AbstractBlock implements Block{
    protected String type;
    protected String blockName;
    protected List<?> content;
    protected Style style;
}
