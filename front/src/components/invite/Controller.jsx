"use client";
import * as React from "react";

import { useAtom } from "jotai";
import { selectedBlockAtom } from "@/atoms/selectedBlock";
import { scrollStyle } from "@/styles/scroll";

import Box from "@mui/material/Box";

import CalendarBlockController from "@/components/invite/controllers/CalendarBlockController";
import GalleryBlockController from "@/components/invite/controllers/GalleryBlockController";
import GuestbookBlockController from "@/components/invite/controllers/GuestbookBlockController";
import MapBlockController from "@/components/invite/controllers/MapBlockController";
import NestedBlockController from "@/components/invite/controllers/NestedBlockController";
import TextBlockController from "@/components/invite/controllers/TextBlockController";

export default function Controller() {
  const [selectedBlock] = useAtom(selectedBlockAtom);

  const controllerType = (type) => {
    switch (type) {
      case "blocks":
        return <NestedBlockController />;
      case "text":
        return <TextBlockController />;
      case "gallery":
        return <GalleryBlockController />;
      case "guest_book":
        return <GuestbookBlockController />;
      case "calendar":
        return <CalendarBlockController />;
      case "map":
        return <MapBlockController />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 84px)",
        minWidth: 350,
        marginTop: "20px",
        paddingLeft: "10px",
        ...scrollStyle,
      }}
    >
      {selectedBlock.block
        ? controllerType(selectedBlock.block.type)
        : "블록을 선택하세요"}
    </Box>
  );
}
