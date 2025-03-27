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
          opacity: 1, // 호버 시 아이콘 보이기
        },
      }}
    >
      <Box
        className="iconBox"
        sx={{
          ...buttonStyle,
          opacity: 0, // 기본적으로 숨겨짐
          transition: "opacity 0.3s", // 부드러운 트랜지션
        }}
      >
        <AddIcon sx={{ ...iconStyle }} />
      </Box>
      <Box
        className="iconBox"
        sx={{
          ...buttonStyle,
          opacity: 0, // 기본적으로 숨겨짐
          transition: "opacity 0.3s", // 부드러운 트랜지션
        }}
      >
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
  transition: "background 0.3s", // 부드러운 색상 변화
  "&:hover": {
    background: "rgba(0,0,0,0.1)", // 호버 상태에서 색상 변경
  },
  "&:active": {
    background: "rgba(0,0,0,0.2)", // 클릭 상태에서 색상 변경
  },
};

const iconStyle = {
  color: "rgba(0,0,0,0.2)",
};
