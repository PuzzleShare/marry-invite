"use client";
import * as React from "react";
import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";
import { scrollStyle } from "@/styles/scroll";

import { Box, Button, Divider } from "@mui/material";

import {
  CalendarBlockController,
  GalleryBlockController,
  GuestbookBlockController,
  MapBlockController,
  NestedBlockController,
  TextBlockController,
} from "@/components/invite/controllers";

export default function Controller() {
  const [, setBlockData] = useAtom(blockDataAtom);
  const [selectedBlock, setSelectedBlock] = useAtom(selectedBlockAtom);

  const handleDeleteBlock = () => {
    setBlockData((prevData) => {
      const newData = { ...prevData };

      const updateBlockByPath = (blocks, path) => {
        if (path.length === 1) {
          blocks.splice(path[0], 1);
          setSelectedBlock({ block: null, path: [] });
        } else {
          updateBlockByPath(blocks[path[0]].content, path.slice(1));
        }
      };

      updateBlockByPath(newData.content, selectedBlock.path);
      return newData;
    });
  };

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent={"space-between"}
      height="calc(100vh - 84px)"
      minWidth="350px"
      marginTop="20px"
    >
      <Box
        sx={{
          ...scrollStyle,
        }}
      >
        {selectedBlock.block ? (
          <Box>
            {controllerType(selectedBlock.block.type)}
            <Divider />
            <Box marginTop={"20px"} textAlign={"center"}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleDeleteBlock();
                }}
              >
                블럭 삭제
              </Button>
            </Box>
          </Box>
        ) : (
          "블록을 선택하세요"
        )}
      </Box>
      <Box padding="0 10px 10px" textAlign={"center"}></Box>
    </Box>
  );
}

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
