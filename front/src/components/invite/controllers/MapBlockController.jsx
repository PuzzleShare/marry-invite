import * as React from "react";
import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { getCoordinates } from "@/api/invite/map";

export default function MapBlockController() {
  const [, setBlockData] = useAtom(blockDataAtom);
  const [selectedBlock] = useAtom(selectedBlockAtom);

  const [address, setAddress] = React.useState(
    selectedBlock?.block?.content?.[0] || ""
  );
  const [detailAddress, setDetailAddress] = React.useState(
    selectedBlock?.block?.content?.[1] || ""
  );

  const handleMapMarker = (x, y, roadAddress) => {
    setBlockData((prevData) => {
      const newData = { ...prevData };

      const updateBlockByPath = (blocks, path) => {
        if (path.length === 1) {
          blocks[path[0]].content = [roadAddress, detailAddress, y, x];
        } else {
          updateBlockByPath(blocks[path[0]].content, path.slice(1));
        }
      };

      updateBlockByPath(newData.content, selectedBlock.path);
      return newData;
    });
  };

  // 주소 -> 위도/경도 변환 함수
  const fetchCoordinates = async () => {
    if (!address) {
      alert("주소를 입력하세요.");
      return;
    }

    const { x, y, roadAddress } = await getCoordinates(address);
    handleMapMarker(x, y, roadAddress);
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="주소 입력"
        variant="standard"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
        fullWidth
        label="상세 주소 입력"
        variant="standard"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />
      <Box
        alignItems="end"
        display="flex"
        flexDirection="column"
        marginTop="20px"
      >
        <Button variant="contained" color="primary" onClick={fetchCoordinates}>
          위치 저장
        </Button>
      </Box>
    </Box>
  );
}
