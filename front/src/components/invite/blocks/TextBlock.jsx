import { Box } from "@mui/material";

export default function TextBlock({ block }) {
  const text = block.content[0];
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: text }}
      sx={{ ...block.style }}
    ></Box>
  );
}
