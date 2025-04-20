import * as React from "react";

import {
  CalendarBlock,
  GalleryBlock,
  GuestbookBlock,
  MapBlock,
  NestedBlock,
  TextBlock,
} from "@/components/invite/blocks";

const blockMap = {
  blocks: (block, index) => <NestedBlock block={block} path={[index]} />,
  text: (block, _) => <TextBlock block={block} />,
  gallery: (block, _) => <GalleryBlock block={block} />,
  guest_book: (block, _) => <GuestbookBlock block={block} />,
  calendar: (block, _) => <CalendarBlock block={block} />,
  map: (block, _) => <MapBlock block={block} />,
};

export default function BlockContainer({ block, index }) {
  if (!blockMap[block.type] || block.style?.display === "none") {
    return null;
  }
  return blockMap[block.type](block, index);
}

const blockType = (block, index) => {
  if (block.type === "blocks") {
    return <NestedBlock block={block} path={[index]} />;
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
