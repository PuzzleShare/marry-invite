"use client";
import * as React from "react";

import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";

import Box from "@mui/material/Box";

import CalenderBlockController from "@/components/create/controllers/CalendarBlockController";
import GalleryBlockController from "@/components/create/controllers/GalleryBlockController";
import GuestbookBlockController from "@/components/create/controllers/GuestbookBlockController";
import MapBlockController from "@/components/create/controllers/MapBlockController";
import NestedBlockController from "@/components/create/controllers/NestedBlockController";
import TextBlockController from "@/components/create/controllers/TextBlockController";

export default function Controller() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        width: 350,
        paddingLeft: "10px",
        ...scrollStyle,
      }}
    >
      <CalenderBlockController />
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
