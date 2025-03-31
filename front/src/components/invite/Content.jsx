"use client";
import * as React from "react";

import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import BlockContainer from "@/components/invite/blocks/BlockContainer";

export default function Content() {
  const [blockData, setBlockData] = useAtom(blockDataAtom);

  return (
    <Stack
      sx={{
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        height: "calc(100vh - 84px)",
        minWidth: "600px",
        marginTop: "20px",
        padding: "0 5px",
        overflow: "auto",
        ...scrollStyle,
      }}
    >
      {blockData.content.map((block, index) => (
        <Box
          key={index}
          sx={{
            width: 540,
            ...block.style,
          }}
        >
          <BlockContainer block={block} />
        </Box>
      ))}
    </Stack>
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
