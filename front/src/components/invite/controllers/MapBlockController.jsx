import * as React from "react";
import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

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

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_END}/map/geocode`,
        {
          params: { address: address },
        }
      );

      console.log(response.data);
      if (!response.data || !response.data.x || !response.data.y) {
        alert("주소를 찾을 수 없습니다.");
        return;
      }

      const { x, y, roadAddress } = response.data;

      handleMapMarker(x, y, roadAddress);
    } catch (error) {
      console.error("Geocoding API 요청 실패:", error);
      alert("위치 정보를 가져오는 데 실패했습니다.");
    }
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
      <Button
        variant="contained"
        color="primary"
        onClick={fetchCoordinates}
        sx={{ mt: 2 }}
      >
        위치 저장
      </Button>
    </Box>
  );
}
