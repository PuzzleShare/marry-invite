import * as React from "react";
import { Stack, Skeleton } from "@mui/material";

export default function Main() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={"100%"} height={500} />
      <Skeleton variant="rectangular" width={"100%"} height={500} />
    </Stack>
  );
}
