"use client";
import * as React from "react";
import BlockContainer from "@/components/invite/blocks/BlockContainer";

import { Stack, Box } from "@mui/material";
import styled from "styled-components";

const ContentRoot = styled(Stack)`
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;
  // min-width: 600px;
  width: 100vw;
  min-height: 100vw;
  padding: 0 5px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px; // 스크롤바 너비
  }
  &::-webkit-scrollbar-thumb {
    backgroundcolor: #888; // 스크롤바 색상
    borderradius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    backgroundcolor: #555; // 호버 시 색상 변경
  }
`;

export default function Content({ blockData }) {
  return (
    <ContentRoot>
      {blockData.content.map((block, index) => (
        <Box key={index} width={540}>
          <BlockContainer block={block} index={index} />
        </Box>
      ))}
    </ContentRoot>
  );
}
