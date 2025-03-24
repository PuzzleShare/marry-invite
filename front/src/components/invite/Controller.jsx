"use client";
import * as React from "react";

import { useAtom } from "jotai";
import { selectedBlockAtom } from "@/atoms/selectedBlock";

import Box from "@mui/material/Box";

import CalendarBlockController from "@/components/invite/controllers/CalendarBlockController";
import GalleryBlockController from "@/components/invite/controllers/GalleryBlockController";
import GuestbookBlockController from "@/components/invite/controllers/GuestbookBlockController";
import MapBlockController from "@/components/invite/controllers/MapBlockController";
import NestedBlockController from "@/components/invite/controllers/NestedBlockController";
import TextBlockController from "@/components/invite/controllers/TextBlockController";

export default function Controller() {
  const [selectedBlock] = useAtom(selectedBlockAtom);

  const controllerType = (type, block, path) => {
    switch (type) {
      case "blocks":
        return <NestedBlockController block={block} path={path} />;
      case "text":
        return <TextBlockController block={block} path={path} />;
      case "gallery":
        return <GalleryBlockController block={block} path={path} />;
      case "guest_book":
        return <GuestbookBlockController block={block} path={path} />;
      case "calendar":
        return <CalendarBlockController block={block} path={path} />;
      case "map":
        return <MapBlockController block={block} path={path} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        maxWidth: 400,
        padding: "8px 0 0 10px",
        ...scrollStyle,
      }}
    >
      {selectedBlock.block
        ? controllerType(
            selectedBlock.block.type,
            selectedBlock.block,
            selectedBlock.path
          )
        : "블록을 선택하세요"}
    </Box>
  );
}

const scrollStyle = {
  "&::-webkit-scrollbar": {
    width: "8px", // 스크롤바 너비
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888", // 스크롤바 색상
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555", // 호버 시 색상 변경
  },
};
