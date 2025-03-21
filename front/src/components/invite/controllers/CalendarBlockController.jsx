import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

dayjs.locale("ko");

export default function CalendarBlockController() {
  const [selectedDateTime, setSelectedDateTime] = React.useState(
    dayjs("2025-04-17T15:30")
  );

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ko"
      sx={{ width: 350 }}
    >
      <StaticDateTimePicker
        value={selectedDateTime}
        onChange={(newValue) => setSelectedDateTime(newValue)}
        slotProps={{ actionBar: { actions: [] } }}
      />
    </LocalizationProvider>
  );
}
