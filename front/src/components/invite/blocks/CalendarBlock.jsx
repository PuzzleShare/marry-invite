import * as React from "react";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Typography, Box } from "@mui/material";

export default function DateCalendarFormProps({ block }) {
  // block 데이터에서 결혼식 날짜를 가져옵니다
  const [weddingDate, setWeddingDate] = React.useState(dayjs(block.content[0])); // 상태 관리

  React.useEffect(() => {
    // block 데이터가 변경되면 weddingDate 업데이트
    setWeddingDate(dayjs(block.content[0]));
  }, [block.content]);

  const formattedDate = weddingDate.format("YYYY년 M월 D일 dddd A h시 m분");
  const today = dayjs();
  const daysLeft = weddingDate.startOf("day").diff(today.startOf("day"), "day");

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      width="100%"
      padding="10px 0"
      sx={{
        ...block.style,
      }}
    >
      <Typography>WEDDING DATE</Typography>
      <Typography variant="h6" gutterBottom>
        {formattedDate}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={weddingDate} // 'defaultValue' 대신 'value' 사용
          onChange={(newDate) => setWeddingDate(newDate)} // 날짜 변경 시 상태 업데이트
          readOnly
          views={["day"]}
          sx={{
            height: "auto", // 캘린더 높이 자동 조정
          }}
          slotProps={{
            toolbar: { sx: { display: "none" } },
            switchViewButton: { sx: { display: "none" } },
            calendarHeader: { sx: { display: "none" } },
          }}
        />
      </LocalizationProvider>
      <Typography variant="h6" marginTop={2}>
        {`~~~ 결혼식이 ${daysLeft}일 남았습니다.`}
      </Typography>
    </Box>
  );
}
