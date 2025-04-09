import * as React from "react";

import {
  CalendarBlock,
  GalleryBlock,
  GuestbookBlock,
  MapBlock,
  NestedBlock,
  TextBlock,
} from "@/components/invite/blocks";

export default function BlockContainer({ block, index }) {
  return blockType(block, index);
}

const blockType = (block, index) => {
  if (block.type === "blocks") {
    return <NestedBlock block={block} index={index} />;
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
