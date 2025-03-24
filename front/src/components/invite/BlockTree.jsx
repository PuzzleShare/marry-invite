import * as React from "react";

import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function BlockTreeContainer() {
  const [blockData, setBlockData] = useAtom(blockDataAtom);

  const updateBlockData = (index, updatedBlock) => {
    setBlockData((prevData) => {
      const updateContent = (blocks, idx) => {
        return blocks.map((b, i) =>
          i === idx
            ? updatedBlock
            : b.type === "blocks"
            ? { ...b, content: updateContent(b.content, idx) }
            : b
        );
      };
      return { ...prevData, content: updateContent(prevData.content, index) };
    });
  };

  return (
    <Box sx={{ paddingTop: "8px", minWidth: "300px" }}>
      <BlockTree
        content={blockData.content}
        updateBlockData={updateBlockData}
      />
    </Box>
  );
}

function BlockTree({
  content,
  depth = 0,
  parentDisplay = "block",
  updateBlockData,
}) {
  const [open, setOpen] = React.useState({});

  const handleClick = (index) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [index]: !prevOpen[index],
    }));
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
              disableRipple
              onClick={() => handleClick(index)}
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
                  updateBlockData(index, {
                    ...block,
                    style: {
                      ...block.style,
                      display:
                        block.style.display === "none" ? "block" : "none",
                    },
                  });
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
                  parentDisplay={currentDisplay} // 부모 상태 전달
                  updateBlockData={(childIndex, updatedChildBlock) => {
                    updateBlockData(index, {
                      ...block,
                      content: block.content.map((b, i) =>
                        i === childIndex ? updatedChildBlock : b
                      ),
                    });
                  }}
                />
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
}
