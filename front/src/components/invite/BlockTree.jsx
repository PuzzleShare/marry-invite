import * as React from "react";

import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Edit from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Folder from "@mui/icons-material/Folder";
import TextFields from "@mui/icons-material/TextFields";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function BlockTree({ content, depth = 0 }) {
  const [open, setOpen] = React.useState({});

  const handleClick = (index) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [index]: !prevOpen[index],
    }));
  };

  const onDragEnd = (result) => {
    // todo: 드래그 & 드랍 적용
  };

  const listItemIcon = (type) => {
    switch (type) {
      case "blocks":
        return <Folder />;
      case "text":
        return <TextFields />;
      case "gallery":
        return <PhotoCameraIcon />;
      case "guest_book":
        return <Edit />;
      case "calendar":
        return <CalendarMonthIcon />;
      case "map":
        return <LocationOnIcon />;
      default:
        return null;
    }
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      {content.map((block, index) => (
        <React.Fragment key={index}>
          <ListItemButton
            sx={{ pl: depth * 2 }}
            onClick={() => handleClick(index)}
          >
            <ListItemIcon>{listItemIcon(block.type)}</ListItemIcon>
            <ListItemText primary={block.blockName} />
            {block.type === "blocks" &&
              (open[index] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          {block.type === "blocks" && (
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <BlockTree content={block.content} depth={depth + 1} />
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
}
