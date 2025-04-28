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
  const [blockData, setBlockData] = useAtom(blockDataAtom);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    // [수정 필요]
    // 내부로 요소 이동이 안되는 그룹 블록 있음.
    // 그룹이나 그룹 내부 요소를 이동할 때 ui 깨지는 문제 있음.

    const sourcePath = result.source.droppableId.split("-").map(Number);
    const destPath = result.destination.droppableId.split("-").map(Number);

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (isNaN(sourcePath[0])) {
      sourcePath.shift();
    }
    if (isNaN(destPath[0])) {
      destPath.shift();
    }
    sourcePath.push(sourceIndex);
    destPath.push(destIndex);

    setBlockData((prevData) => {
      const copy = JSON.parse(JSON.stringify(prevData.content));

      const getNestedBlock = (path, blocks) => {
        if (path.length === 1) return blocks;
        return getNestedBlock(path.slice(1), blocks[path[0]].content);
      };

      const sourceBlocks = getNestedBlock(sourcePath, copy);
      const destBlocks = getNestedBlock(destPath, copy);

      const [movedItem] = sourceBlocks.splice(sourceIndex, 1);
      destBlocks.splice(destIndex, 0, movedItem);

      return { ...prevData, content: copy };
    });
  };

  return (
    <Box
      sx={{
        minWidth: "300px",
        ...scrollStyle,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <BlockTree content={blockData.content} />
      </DragDropContext>
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
      const insertBlockByPath = (blocks, path) => {
        if (path.length === 0) {
          blocks.push(newBlock(type));
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
    <Droppable droppableId={path.join("-") || "root"} type="BLOCK">
      {(provided) => (
        <>
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              width: "100%",
              maxWidth: 360,
              padding: 0,
              bgcolor: "background.paper",
            }}
            component="nav"
          >
            {content.map((block, index) => {
              const currentPath = [...path, index];

              // 현재 블록의 display 상태 결정 (부모가 숨겨졌다면 무조건 숨김)
              const currentDisplay =
                parentDisplay === "none"
                  ? "none"
                  : block.style.display ?? "block";

              return (
                <Draggable
                  key={currentPath.join("-")}
                  draggableId={currentPath.join("-")}
                  index={index}
                >
                  {(draggableProvided) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <ListItemButton
                        sx={{
                          pl: depth * 2,
                          opacity: currentDisplay === "none" ? 0.3 : 1, // 개별 블록의 상태 반영
                        }}
                        onClick={() => handleClick(block, index)}
                      >
                        <ListItemIcon>{listItemIcon(block.type)}</ListItemIcon>
                        <ListItemText primary={block.blockName} />
                        {block.type === "blocks" && (
                          <IconButton
                            onMouseDown={(event) => {
                              event.stopPropagation();
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              setOpen((prevOpen) => ({
                                ...prevOpen,
                                [index]: !prevOpen[index],
                              }));
                            }}
                          >
                            {open[index] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        )}

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
                    </div>
                  )}
                </Draggable>
              );
            })}

            {provided.placeholder}
          </List>
          <Box textAlign={"center"} sx={{ pl: depth * 2 }}>
            <IconButton
              size="large"
              onClick={(event) => handleAddBlockClick(event, path)}
            >
              <AddIcon fontSize="medium" />
            </IconButton>
            {depth !== 0 && (
              <Divider component="li" sx={{ marginRight: "10px" }} />
            )}
          </Box>
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
        </>
      )}
    </Droppable>
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

function newBlock(type) {
  switch (type) {
    case "blocks":
      return {
        blockName: "그룹",
        type: type,
        shape: {
          direction: "column", // "column" | "row"
          spacing: 0, // 0 ~ 5
        },
        style: { display: "block" },
        content: [],
      };
    case "text":
      return {
        blockName: "텍스트",
        type: type,
        style: { display: "block" },
        content: [],
      };
    case "gallery":
      return {
        blockName: "겔러리",
        type: type,
        shape: {
          type: "gallery", // "gallery" | "slider"
          cols: 3, // 1 | 2 | 3
          spacing: 0, // 0 ~ 5
        },
        style: { display: "block" },
        content: [],
      };
    default:
      return null;
  }
}
