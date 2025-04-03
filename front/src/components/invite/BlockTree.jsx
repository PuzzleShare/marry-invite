import * as React from "react";

import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";
import { scrollStyle } from "@/styles/scroll";

import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import {
  CalendarMonth as CalendarMonthIcon,
  PhotoCamera as PhotoCameraIcon,
  Edit,
  LocationOn as LocationOnIcon,
  Folder,
  TextFields,
  ExpandLess,
  ExpandMore,
  VisibilityOutlined as VisibilityOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  Add as AddIcon,
} from "@mui/icons-material";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function BlockTreeContainer() {
  const [blockData] = useAtom(blockDataAtom);

  return (
    <Box
      sx={{
        marginTop: "20px",
        minWidth: "300px",
        height: "calc(100vh - 84px)",
        ...scrollStyle,
      }}
    >
      <BlockTree content={blockData.content} />
    </Box>
  );
}

function BlockTree({ content, depth = 0, path = [], parentDisplay = "block" }) {
  const [, setBlockData] = useAtom(blockDataAtom);
  const [, setSelectedBlock] = useAtom(selectedBlockAtom);
  const [open, setOpen] = React.useState({});

  const handleClick = (block, index) => {
    setSelectedBlock({ block, path: [...path, index] });
    setOpen((prevOpen) => ({
      ...prevOpen,
      [index]: !prevOpen[index],
    }));
  };

  const updateBlockDisplay = (path, display) => {
    setBlockData((prevData) => {
      const newData = { ...prevData };

      const updateBlockByPath = (blocks, path) => {
        if (path.length === 1) {
          blocks[path[0]].style = {
            ...blocks[path[0]].style,
            display: display,
          };
        } else {
          updateBlockByPath(blocks[path[0]].content, path.slice(1));
        }
      };

      updateBlockByPath(newData.content, path);
      return newData;
    });
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
      sx={{
        width: "100%",
        maxWidth: 360,
        padding: 0,
        bgcolor: "background.paper",
      }}
      component="nav"
    >
      {content.map((block, index) => {
        // 현재 블록의 display 상태 결정 (부모가 숨겨졌다면 무조건 숨김)
        const currentDisplay =
          parentDisplay === "none" ? "none" : block.style.display;

        return (
          <React.Fragment key={index}>
            <ListItemButton
              sx={{
                pl: depth * 2,
                opacity: currentDisplay === "none" ? 0.3 : 1, // 개별 블록의 상태 반영
              }}
              onClick={() => handleClick(block, index)}
            >
              <ListItemIcon>{listItemIcon(block.type)}</ListItemIcon>
              <ListItemText primary={block.blockName} />
              {block.type === "blocks" &&
                (open[index] ? <ExpandLess /> : <ExpandMore />)}

              <IconButton
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  updateBlockDisplay(
                    [...path, index],
                    block.style.display === "none" ? "block" : "none"
                  );
                }}
              >
                {block.style.display === "none" ? (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                ) : (
                  <VisibilityOutlinedIcon fontSize="small" />
                )}
              </IconButton>
            </ListItemButton>
            {block.type === "blocks" && (
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <BlockTree
                  content={block.content}
                  depth={depth + 1}
                  path={[...path, index]}
                  parentDisplay={currentDisplay} // 부모 상태 전달
                />
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
}
