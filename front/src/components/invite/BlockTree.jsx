import * as React from "react";

import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";
import { scrollStyle } from "@/styles/scroll";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import {
  Box,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import {
  CalendarMonth as CalendarMonthIcon,
  PhotoCamera as PhotoCameraIcon,
  Edit as EditIcon,
  LocationOn as LocationOnIcon,
  Folder as FolderIcon,
  TextFields as TextFieldsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  Add as AddIcon,
} from "@mui/icons-material";

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
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [addBlockPath, setAddBlockPath] = React.useState(null);

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

  const handleAddBlockClick = (event, path) => {
    setMenuAnchor(event.currentTarget);
    setAddBlockPath(path);
  };

  const handleAddBlock = (type) => {
    if (!addBlockPath) return;
    setBlockData((prevData) => {
      const newData = { ...prevData };
      const newBlock = {
        blockName: type.charAt(0).toUpperCase() + type.slice(1) + " Block",
        type,
        content: [],
        style: { display: "block" },
      };

      const insertBlockByPath = (blocks, path) => {
        if (path.length === 0) {
          blocks.push(newBlock);
        } else {
          insertBlockByPath(blocks[path[0]].content, path.slice(1));
        }
      };

      insertBlockByPath(newData.content, addBlockPath);
      return newData;
    });

    setMenuAnchor(null);
    setAddBlockPath(null);
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
                (open[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />)}

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
      <Box textAlign={"center"} sx={{ pl: depth * 2 }}>
        <IconButton
          size="large"
          onClick={(event) => handleAddBlockClick(event, path)}
        >
          <AddIcon fontSize="medium" />
        </IconButton>
        {depth !== 0 && <Divider component="li" />}
      </Box>

      {/* 블록 추가 메뉴 */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => handleAddBlock("text")}>
          <ListItemIcon>
            <TextFieldsIcon />
          </ListItemIcon>{" "}
          텍스트
        </MenuItem>
        <MenuItem onClick={() => handleAddBlock("gallery")}>
          <ListItemIcon>
            <PhotoCameraIcon />
          </ListItemIcon>{" "}
          갤러리
        </MenuItem>
        <MenuItem onClick={() => handleAddBlock("blocks")}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>{" "}
          그룹
        </MenuItem>
      </Menu>
    </List>
  );
}

function listItemIcon(type) {
  switch (type) {
    case "blocks":
      return <FolderIcon />;
    case "text":
      return <TextFieldsIcon />;
    case "gallery":
      return <PhotoCameraIcon />;
    case "guest_book":
      return <EditIcon />;
    case "calendar":
      return <CalendarMonthIcon />;
    case "map":
      return <LocationOnIcon />;
    default:
      return null;
  }
}
