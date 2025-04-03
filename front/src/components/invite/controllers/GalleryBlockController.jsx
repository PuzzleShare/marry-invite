import React, { useState } from "react";
import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";
import { uploadFile } from "@/api/invite/gallery";

import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Typography,
  Stack,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function GalleryBlockController() {
  const [blockData, setBlockData] = useAtom(blockDataAtom);
  const [selectedBlock] = useAtom(selectedBlockAtom);
  const [files, setFiles] = useState([]);

  // 파일 선택 또는 드래그 앤 드롭
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploadedUrl: null,
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // 개별 파일 업로드
  const handleUpload = async (index) => {
    const fileData = files[index];
    const formData = new FormData();
    formData.append("file", fileData.file);

    const data = await uploadFile(formData);
    console.log(data);

    if (data) {
      // `uploadedUrl` 업데이트
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[index] = { ...updatedFiles[index], uploadedUrl: data.url }; // 백엔드 응답 구조 확인 필요
        return updatedFiles;
      });

      // blockData 업데이트
      setBlockData((prevData) => {
        const newData = { ...prevData };

        const updateBlockByPath = (blocks, path) => {
          if (path.length === 1) {
            blocks[path[0]].content.push(data.url); // 백엔드 응답에 따라 수정 필요
          } else {
            updateBlockByPath(blocks[path[0]].content, path.slice(1));
          }
        };

        updateBlockByPath(newData.content, selectedBlock.path);
        return newData;
      });
    }
  };

  // 미리보기 제거
  const handleDeletePreview = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // 사진 제거
  const handleDeleteImage = (index) => {
    setBlockData((prevData) => {
      const newData = { ...prevData };

      const updateBlockByPath = (blocks, path) => {
        if (path.length === 1) {
          blocks[path[0]].content = selectedBlock.block.content.filter(
            (_, i) => i !== index
          );
        } else {
          updateBlockByPath(blocks[path[0]].content, path.slice(1));
        }
      };

      updateBlockByPath(newData.content, selectedBlock.path);
      return newData;
    });
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          사진 업로드 (jpg, jpeg, png)
        </Typography>

        {/* 파일 선택 */}
        <Button
          variant="outlined"
          component="label"
          sx={{ width: "100%", height: "50px", mb: 2 }}
        >
          사진 선택
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </Button>

        <ImageList
          variant="masonry"
          cols={3}
          gap={8}
          sx={{ margin: 0, p: 0.5 }}
        >
          {files.map(
            (fileData, index) =>
              !fileData.uploadedUrl && (
                <ImageListItem key={index}>
                  <Card key={index} sx={{ position: "relative", p: 1 }}>
                    <CardMedia
                      component="img"
                      image={fileData.preview}
                      alt="Preview"
                    />
                    <Box sx={{ textAlign: "center", mt: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleUpload(index)}
                      >
                        업로드
                      </Button>
                    </Box>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                      }}
                      onClick={() => handleDeletePreview(index)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Card>
                </ImageListItem>
              )
          )}
        </ImageList>
      </Box>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          업로드된 사진
        </Typography>
        <ImageList
          variant="masonry"
          cols={3}
          gap={8}
          sx={{ margin: 0, p: 0.5 }}
        >
          {selectedBlock.block.content.map((item, index) => (
            <ImageListItem key={index}>
              <Card key={index} sx={{ position: "relative", p: 1 }}>
                <CardMedia component="img" image={item} alt="Preview" />
              </Card>
              <IconButton
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                }}
                onClick={() => handleDeleteImage(index)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Stack>
  );
}
