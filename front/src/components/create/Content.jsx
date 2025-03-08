import * as React from "react";
import Box from "@mui/material/Box";

export default function Content() {
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        height: "calc(100vh - 84px)",
        marginTop: "20px",
        overflow: "auto",
        whiteSpace: "normal", // 기본 줄바꿈 허용
        wordBreak: "break-word", // 단어가 길어도 줄바꿈
        ...scrollStyle,
      }}
    >
      <Box>
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
