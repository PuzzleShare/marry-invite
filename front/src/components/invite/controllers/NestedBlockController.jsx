import * as React from "react";
import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";

import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  ViewStreamSharp as ColumnIcon,
  ViewWeekSharp as RowIcon,
} from "@mui/icons-material";

export default function NestedBlockController() {
  const [, setBlockData] = useAtom(blockDataAtom);
  const [selectedBlock] = useAtom(selectedBlockAtom);
  const [direction, setDirection] = React.useState(
    selectedBlock?.block?.shape?.direction || "column"
  );

  React.useEffect(() => {
    setDirection(selectedBlock.block.shape.direction);
  }, [selectedBlock]);

  const handleChange = (event, newDirection) => {
    if (newDirection === null) return;

    setDirection(newDirection);

    setBlockData((prevData) => {
      const newData = { ...prevData };

      const updateBlockByPath = (blocks, path) => {
        const current = blocks[path[0]];
        if (path.length === 1) {
          current.shape = {
            ...current.shape,
            direction: newDirection, // ✅ 여기가 중요!
          };
        } else {
          updateBlockByPath(current.content, path.slice(1));
        }
      };

      updateBlockByPath(newData.content, selectedBlock.path);
      return newData;
    });
  };

  return (
    <Box>
      <ToggleButtonGroup value={direction} exclusive onChange={handleChange}>
        <ToggleButton value="column">
          <ColumnIcon />
        </ToggleButton>
        <ToggleButton value="row">
          <RowIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
