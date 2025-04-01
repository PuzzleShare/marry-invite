"use client";
import * as React from "react";

import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { scrollStyle } from "@/styles/scroll";

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
