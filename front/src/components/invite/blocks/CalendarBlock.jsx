import * as React from "react";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Typography, Box } from "@mui/material";

export default function DateCalendarFormProps() {
  const date = dayjs("2025-04-17T15:30");
  const formattedDate = date.format("YYYY년 M월 D일 dddd A h시 m분");
  const today = dayjs();
  const daysLeft = date.startOf("day").diff(today.startOf("day"), "day");

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      sx={{
        width: "100%",
        padding: "30px 0",
      }}
    >
      <Typography>WEDDING DATE</Typography>
      <Typography variant="h6" gutterBottom>
        {formattedDate}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar defaultValue={date} readOnly />
      </LocalizationProvider>
      <Typography variant="h6" marginTop={2}>
        {`~~~ 결혼식이 ${daysLeft}일 남았습니다.`}
      </Typography>
    </Box>
  );
}
