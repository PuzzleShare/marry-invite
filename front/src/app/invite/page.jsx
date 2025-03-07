"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import BlockTree from "@/components/create/BlockTree";
import Header from "@/components/Header";

const Content = () => {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("inviteId");
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          width: 300,
          background: "rgba(0,0,0,0.1)",
          overflow: "auto",
        }}
      >
        <BlockTree />
      </Box>
      <Box
        sx={{
          maxHeight: "calc(100vh - 84px)",
          marginTop: "20px",
          overflow: "auto",
          padding: "0 10px 0 15px",
          whiteSpace: "normal", // 기본 줄바꿈 허용
          wordBreak: "break-word", // 단어가 길어도 줄바꿈
          /* 스크롤바 스타일 */
          "&::-webkit-scrollbar": {
            width: "8px", // 스크롤바 너비
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(0,0,0,0.1)", // 스크롤바 트랙 배경색
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // 스크롤바 색상
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555", // 호버 시 색상 변경
          },
        }}
      >
        {colorArray.map((color, index) => (
          <Box
            key={index}
            sx={{
              width: 460,
              height: 500,
              background: color,
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          width: 300,
          background: "rgba(0,0,0,0.1)",
          overflow: "auto",
        }}
      ></Box>
    </Container>
  );
};

export default function CreatePage() {
  const colorArray = [
    "rgb(247, 108, 108)",
    "rgb(247, 203, 108)",
    "rgb(194, 247, 108)",
    "rgb(108, 247, 212)",
    "rgb(108, 145, 247)",
    "rgb(173, 108, 247)",
    "rgb(247, 108, 205)",
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Suspense>
        <Content />
      </Suspense>
    </React.Fragment>
  );
}
