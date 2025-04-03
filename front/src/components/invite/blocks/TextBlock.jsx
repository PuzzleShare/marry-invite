import * as React from "react";
import { Box } from "@mui/material";

export default function TextBlock({ block }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        minHeight: "200px",
        border: "4px solid rgba(0,0,0,0.1)",
      }}
    >
      TextBlock
    </Box>
  );
}
