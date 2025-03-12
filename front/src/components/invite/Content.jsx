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
        minWidth: "460px",
        marginTop: "20px",
        overflow: "auto",
        whiteSpace: "normal", // 기본 줄바꿈 허용
        wordBreak: "break-word", // 단어가 길어도 줄바꿈
        ...scrollStyle,
      }}
    >
      {blockData.content.map((block, index) => (
        <Box
          key={index}
          sx={{
            width: 460,
          }}
        >
          <BlockContainer block={block} index={index} />
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
