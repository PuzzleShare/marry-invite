import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

dayjs.locale("ko");

export default function CalendarBlockController() {
  const [, setBlockData] = useAtom(blockDataAtom);
  const [selectedBlock] = useAtom(selectedBlockAtom);
  const [selectedDateTime, setSelectedDateTime] = React.useState(
    dayjs(selectedBlock.block.content[0])
  );

  React.useEffect(() => {
    setSelectedDateTime(dayjs(selectedBlock.block.content[0]));
  }, [selectedBlock]);

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

      updateBlockByPath(newData.content, selectedBlock.path);
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
