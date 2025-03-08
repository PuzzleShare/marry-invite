"use client";
import * as React from "react";

import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";

import Box from "@mui/material/Box";

export default function BlockTree() {
  const [blockData, setBlockData] = useAtom(blockDataAtom);

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        width: 300,
        ...scrollStyle,
      }}
    ></Box>
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
