import * as React from "react";
import { scrollStyle } from "@/styles/scroll";
import { Box, ImageList, ImageListItem } from "@mui/material";

export default function GalleryBlock({ block }) {
  return <Gallery block={block} />;
}

function Gallery({ block }) {
  return (
    <Box
      width="100%"
      sx={{
        ...block.style,
        ...scrollStyle,
      }}
    >
      <ImageList variant="masonry" cols={3} gap={8} sx={{ margin: 0 }}>
        {block.content.map((item, index) => (
          <ImageListItem key={index}>
            <img src={item} alt="Gallery image" loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

function Slider({ block }) {}
