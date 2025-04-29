import * as React from "react";
import { Box, Stack, IconButton } from "@mui/material";
import { MuiColorInput } from "mui-color-input";

const presetColors = ["#FF5733", "#33FF57", "#3357FF", "#FFD700", "#8E44AD"];

export default function ColorPicker({ color, setColor }) {
  const handleChange = (newValue) => {
    setColor(newValue);
  };

  return (
    <Box sx={{ maxWidth: 300 }}>
      <MuiColorInput
        format="hex8"
        value={color}
        onChange={handleChange}
        fullWidth
      />

      <Stack direction="row" spacing={1} mt={1}>
        {presetColors.map((preset) => (
          <IconButton
            key={preset}
            onClick={() => handleChange(preset)}
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: preset,
              "&:hover": { backgroundColor: preset },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
