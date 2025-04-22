package com.marry_invite.invite.document.block;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString(callSuper = true)
public class RootBlock extends AbstractBlock {
    private String title;
    private String bgm;
    private String imageUrl;
}
