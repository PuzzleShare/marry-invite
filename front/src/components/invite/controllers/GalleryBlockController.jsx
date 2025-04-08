import React from "react";
import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";
import { uploadFile } from "@/api/invite/gallery";

import { Delete } from "@mui/icons-material";
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

export default function GalleryBlockController() {
  const [, setBlockData] = useAtom(blockDataAtom);
  const [selectedBlock] = useAtom(selectedBlockAtom);
  const [files, setFiles] = React.useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploadedUrl: null,
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleUpload = async (index) => {
    const fileData = files[index];
    const formData = new FormData();
    formData.append("file", fileData.file);

    const data = await uploadFile(formData);

    if (data) {
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[index] = { ...updatedFiles[index], uploadedUrl: data.url };
        return updatedFiles;
      });

      setBlockData((prevData) => {
        const newData = { ...prevData };

        const updateBlockByPath = (blocks, path) => {
          if (path.length === 1) {
            blocks[path[0]].content.push(data.url);
          } else {
            updateBlockByPath(blocks[path[0]].content, path.slice(1));
          }
        };

        updateBlockByPath(newData.content, selectedBlock.path);
        return newData;
      });
    }
  };

  const handleDeletePreview = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

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
