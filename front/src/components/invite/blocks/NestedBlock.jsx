import * as React from "react";

import { Stack } from "@mui/material";

import {
  CalendarBlock,
  GalleryBlock,
  GuestbookBlock,
  MapBlock,
  TextBlock,
} from "@/components/invite/blocks";

export default function NestedBlock({ block, path }) {
  return (
    <Stack direction={block.shape.direction} spacing={block.shape.spacing}>
      {block.content.map((block, index) => {
        return (
          <React.Fragment key={index}>
            {block.type !== "blocks" ? (
              blockType(block)
            ) : (
              <NestedBlock block={block} path={[...path, index]} />
            )}
          </React.Fragment>
        );
      })}
    </Stack>
  );
}

const blockType = (block) => {
  if (block.type === "text") {
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
