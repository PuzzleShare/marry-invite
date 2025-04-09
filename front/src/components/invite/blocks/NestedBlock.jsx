import * as React from "react";

import { Stack, Box } from "@mui/material";

import {
  CalendarBlock,
  GalleryBlock,
  GuestbookBlock,
  MapBlock,
  TextBlock,
} from "@/components/invite/blocks";

export default function NestedBlock({ block, index }) {
  return <BlockTree content={block.content} path={[index]} />;
}

const blockType = (block) => {
  if (block.type === "blocks") {
    return <NestedBlock block={block} />;
  } else if (block.type === "text") {
    return <TextBlock block={block} />;
  } else if (block.type === "gallery") {
    return <GalleryBlock block={block} />;
  } else if (block.type === "guest_book") {
    return <GuestbookBlock block={block} />;
  } else if (block.type === "calendar") {
    return <CalendarBlock block={block} />;
  } else if (block.type === "map") {
    return <MapBlock block={block} />;
  }
};

function BlockTree({ content, path }) {
  return (
    <Stack direction="row" spacing={2}>
      {content.map((block, index) => {
        return (
          <React.Fragment key={index}>
            {}
            {block.type !== "blocks" ? (
              blockType(block)
            ) : (
              <BlockTree content={block.content} path={[...path, index]} />
            )}
          </React.Fragment>
        );
      })}
    </Stack>
  );
}
