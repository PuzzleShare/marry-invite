"use client";
import * as React from "react";
import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";
import { scrollStyle } from "@/styles/scroll";
import { modifyInvite } from "@/api/invite/invite";
import { useSearchParams } from "next/navigation";

import { Box, Button, Divider, Stack } from "@mui/material";

import {
  CalendarBlockController,
  GalleryBlockController,
  GuestbookBlockController,
  MapBlockController,
  NestedBlockController,
  TextBlockController,
} from "@/components/invite/controllers";

import { Save as SaveIcon } from "@mui/icons-material";

export default function Controller() {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("inviteId");
  const [blockData, setBlockData] = useAtom(blockDataAtom);
  const [selectedBlock, setSelectedBlock] = useAtom(selectedBlockAtom);
  const [loading, setLoading] = React.useState(false);

  const handleDeleteBlock = () => {
    setBlockData((prevData) => {
      const newData = { ...prevData };

      const updateBlockByPath = (blocks, path) => {
        if (path.length === 1) {
          blocks.splice(path[0], 1);
        } else {
          updateBlockByPath(blocks[path[0]].content, path.slice(1));
        }
      };

      updateBlockByPath(newData.content, selectedBlock.path);
      return newData;
    });

    setSelectedBlock({ block: null, path: [] });
  };

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent={"space-between"}
      height="calc(100vh - 84px)"
      minWidth="350px"
      margin="20px 0 0 8px"
    >
      <Box
        sx={{
          ...scrollStyle,
        }}
      >
        {selectedBlock.block ? (
          <Box>{controllerType(selectedBlock.block.type)}</Box>
        ) : (
          "블록을 선택하세요"
        )}
      </Box>
      <Box margin="20px auto 20px">
        <Stack direction={"row"} spacing={1}>
          {selectedBlock.block && (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleDeleteBlock();
              }}
            >
              블럭 삭제
            </Button>
          )}
          <Button
            color="success"
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            width="100%"
            onClick={async () => {
              console.log(blockData);
              setLoading(true);
              await modifyInvite(inviteId, blockData);
              setTimeout(() => {
                setLoading(false);
              }, 500);
            }}
          >
            저장
          </Button>
        </Stack>
      </Box>
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
