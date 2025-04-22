import React from "react";
import { styled } from "@mui/material/styles";
import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { uploadFile } from "@/api/invite/gallery";
import { Loading } from "@/components/invite";

import {
  Box,
  Stack,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function IntroEditor() {
  const [blockData, setBlockData] = useAtom(blockDataAtom);
  const fileInputRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const bgmOptions = [
    { label: "없음", url: "" },
    { label: "BGM 1", url: "/bgm/bgm1.mp3" },
    { label: "BGM 2", url: "/bgm/bgm2.mp3" },
    { label: "BGM 3", url: "/bgm/bgm3.mp3" },
  ];

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setBlockData((prev) => ({ ...prev, title: newTitle }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);
    const uploaded = await uploadFile(formData);
    setIsLoading(false);
    if (uploaded?.url) {
      setBlockData((prev) => ({ ...prev, imageUrl: uploaded.url }));
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleBgmChange = (e) => {
    const url = e.target.value;
    setBlockData((prev) => ({ ...prev, bgm: url }));
  };

  return (
    <Stack paddingRight="15px" direction="column" spacing={1}>
      <TextField
        variant="outlined"
        placeholder="제목 입력"
        value={blockData.title || ""}
        onChange={handleTitleChange}
        InputProps={{
          sx: { fontSize: "1.5rem", fontWeight: "bold" },
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "transparent" },
            "&:hover fieldset": { borderColor: "transparent" },
            "&.Mui-focused fieldset": { borderColor: "transparent" },
          },
        }}
      />

      {/* Image Upload Section */}
      <Box
        onClick={handleClick}
        sx={{
          width: "100%",
          height: 200,
          border: blockData.imageUrl ? "none" : "2px dashed #ccc",
          borderRadius: 2,
          cursor: "pointer",
          backgroundImage: `url(${blockData.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          "&:hover": { opacity: 0.9 },
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          !blockData.imageUrl && (
            <Typography color="textSecondary">
              클릭하여 대표 이미지 선택
            </Typography>
          )
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </Box>

      {/* BGM Dropdown Section */}
      <FormControl fullWidth>
        <InputLabel id="bgm-select-label">BGM 선택</InputLabel>
        <Select
          labelId="bgm-select-label"
          value={blockData.bgm || ""}
          label="BGM 선택"
          onChange={handleBgmChange}
        >
          {bgmOptions.map((opt) => (
            <MenuItem key={opt.label} value={opt.url}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {blockData.bgm && (
        <audio
          controls
          controlsList="nodownload noplaybackrate"
          disableRemotePlayback
          src={blockData.bgm}
          style={{ width: "100%" }}
          onContextMenu={(e) => e.preventDefault()}
        />
      )}
    </Stack>
  );
}
