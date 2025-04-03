import * as React from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import CalendarBlock from "@/components/invite/blocks/CalendarBlock";
import GalleryBlock from "@/components/invite/blocks/GalleryBlock";
import GuestbookBlock from "@/components/invite/blocks/GuestbookBlock";
import MapBlock from "@/components/invite/blocks/MapBlock";
import NestedBlock from "@/components/invite/blocks/NestedBlock";
import TextBlock from "@/components/invite/blocks/TextBlock";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddIcon from "@mui/icons-material/Add";

export default function BlockContainer({ block }) {
  const blockType = (type) => {
    if (type === "blocks") {
      return <NestedBlock block={block} />;
    } else if (type === "text") {
      return <TextBlock block={block} />;
    } else if (type === "gallery") {
      return <GalleryBlock block={block} />;
    } else if (type === "guest_book") {
      return <GuestbookBlock block={block} />;
    } else if (type === "calendar") {
      return <CalendarBlock block={block} />;
    } else if (type === "map") {
      return <MapBlock block={block} />;
    }
  };

  return (
    <Stack
      direction="row"
      spacing={0.5}
      alignItems="start"
      sx={{
        "&:hover .iconBox": {
          opacity: 1,
        },
      }}
    >
      <Box className="iconBox" sx={{ ...buttonStyle }}>
        <AddIcon sx={{ ...iconStyle }} />
      </Box>
      <Box className="iconBox" sx={{ ...buttonStyle }}>
        <DragIndicatorIcon sx={{ ...iconStyle }} />
      </Box>
      {blockType(block.type)}
    </Stack>
  );
}

const buttonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px",
  cursor: "pointer",
  width: "24px",
  height: "24px",
  transition: "background 0.3s",
  opacity: 0,
  transition: "opacity 0.3s",
  "&:hover": {
    background: "rgba(0,0,0,0.05)",
  },
  "&:active": {
    background: "rgba(0,0,0,0.1)",
  },
};

const iconStyle = {
  color: "rgba(0,0,0,0.2)",
};
