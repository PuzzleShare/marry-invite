package com.marry_invite.invite.document.block;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RootBlock extends AbstractBlock {
    private String title;
    private String bgm;
}
