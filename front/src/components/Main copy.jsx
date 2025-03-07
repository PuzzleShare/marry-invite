import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Main() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={"100%"} height={500} />
      <Skeleton variant="rectangular" width={"100%"} height={500} />
    </Stack>
  );
}
