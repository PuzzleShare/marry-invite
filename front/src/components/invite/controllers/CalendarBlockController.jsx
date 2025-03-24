import * as React from "react";

import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";

import dayjs from "dayjs";
import "dayjs/locale/ko";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

dayjs.locale("ko");

export default function CalendarBlockController({ block, path }) {
  const [, setBlockData] = useAtom(blockDataAtom);
  const [selectedDateTime, setSelectedDateTime] = React.useState(
    dayjs(block.content[0])
  );

  const handleDateChange = (newValue) => {
    if (!newValue) return;
    setSelectedDateTime(newValue);

    setBlockData((prevData) => {
      const newData = { ...prevData };

      const updateBlockByPath = (blocks, path) => {
        if (path.length === 1) {
          blocks[path[0]].content = [newValue.format("YYYY-MM-DDTHH:mm")];
        } else {
          updateBlockByPath(blocks[path[0]].content, path.slice(1));
        }
      };

      updateBlockByPath(newData.content, path);
      return newData;
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <StaticDateTimePicker
        value={selectedDateTime}
        disablePast
        onChange={handleDateChange}
        slotProps={{ actionBar: { actions: [] } }}
      />
    </LocalizationProvider>
  );
}
