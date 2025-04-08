import * as React from "react";
import { Stack, Box } from "@mui/material";

import {
  CalendarBlock,
  GalleryBlock,
  GuestbookBlock,
  MapBlock,
  NestedBlock,
  TextBlock,
} from "@/components/invite/blocks";

import {
  DragIndicator as DragIndicatorIcon,
  Add as AddIcon,
} from "@mui/icons-material";

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
    // <Stack
    //   direction="row"
    //   spacing={0.5}
    //   alignItems="start"
    //   sx={{
    //     "&:hover .iconBox": {
    //       opacity: 1,
    //     },
    //   }}
    // >
    //   <Box className="iconBox" sx={{ ...buttonStyle }}>
    //     <AddIcon sx={{ ...iconStyle }} />
    //   </Box>
    //   <Box className="iconBox" sx={{ ...buttonStyle }}>
    //     <DragIndicatorIcon sx={{ ...iconStyle }} />
    //   </Box>
    //   {blockType(block.type)}
    // </Stack>
    blockType(block.type)
  );
}

// const buttonStyle = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   borderRadius: "5px",
//   cursor: "pointer",
//   width: "24px",
//   height: "24px",
//   transition: "background 0.3s",
//   opacity: 0,
//   transition: "opacity 0.3s",
//   "&:hover": {
//     background: "rgba(0,0,0,0.05)",
//   },
//   "&:active": {
//     background: "rgba(0,0,0,0.1)",
//   },
// };

// const iconStyle = {
//   color: "rgba(0,0,0,0.2)",
// };
