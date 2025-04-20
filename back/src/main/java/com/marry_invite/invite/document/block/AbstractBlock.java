package com.marry_invite.invite.document.block;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Map;

@Data
@SuperBuilder
@NoArgsConstructor
public abstract class AbstractBlock implements Block{
    protected String type;
    protected String blockName;
    protected List<?> content;
    protected Map<String, String> style;
    protected Map<String, ?> shape;
}
