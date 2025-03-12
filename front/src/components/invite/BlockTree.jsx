import * as React from "react";
import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// `@hello-pangea/dnd` 라이브러리 사용
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function BlockTree() {
  const [blockData, setBlockData] = useAtom(blockDataAtom);
  const [openItems, setOpenItems] = React.useState({});

  // 드래그 완료 시 순서 변경
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newContent = [...blockData.content];
    const [movedItem] = newContent.splice(result.source.index, 1);
    newContent.splice(result.destination.index, 0, movedItem);

    setBlockData({ ...blockData, content: newContent });
  };

  const handleToggle = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="block-list">
        {(provided) => (
          <List
            sx={{ width: "100%", maxWidth: 300, paddingTop: "8px" }}
            component="nav"
            aria-labelledby="dynamic-list"
            subheader={
              <ListSubheader component="div">Block List Items</ListSubheader>
            }
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {blockData.content.map((item, index) => (
              <Draggable
                key={index}
                draggableId={index.toString()}
                index={index}
              >
                {(provided) => (
                  <React.Fragment>
                    <ListItemButton
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleToggle(index)}
                    >
                      <ListItemText primary={item.type} />
                      {item.type === "blocks" ? (
                        openItems[index] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : null}
                    </ListItemButton>

                    {/* 블록 내부의 하위 리스트 드래그 가능 */}
                    {item.type === "blocks" && (
                      <Collapse
                        in={openItems[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Droppable
                          droppableId={`sub-${index}`}
                          type="sub-block"
                        >
                          {(provided) => (
                            <List
                              component="div"
                              disablePadding
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {item.content.map((subItem, subIndex) => (
                                <Draggable
                                  key={`sub-${index}-${subIndex}`}
                                  draggableId={`sub-${index}-${subIndex}`}
                                  index={subIndex}
                                >
                                  {(provided) => (
                                    <ListItemButton
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      sx={{ pl: 4 }}
                                    >
                                      <ListItemText primary={subItem.type} />
                                    </ListItemButton>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </List>
                          )}
                        </Droppable>
                      </Collapse>
                    )}
                  </React.Fragment>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

{
  /* <List
  sx={{ width: "100%", maxWidth: 300, paddingTop: "8px" }}
  component="nav"
  aria-labelledby="dynamic-list"
  subheader={<ListSubheader component="div">Block List Items</ListSubheader>}
>
  {blockData.content.map((item, index) => (
    <React.Fragment key={index}>
      <ListItemButton onClick={() => handleToggle(index)}>
        <ListItemText primary={item.type} />
        {item.type === "blocks" ? (
          openItems[index] ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : null}
      </ListItemButton>

      {item.type === "blocks" && (
        <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.content.map((subItem, subIndex) => (
              <ListItemButton key={subIndex} sx={{ pl: 4 }}>
                <ListItemText primary={subItem.type} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  ))}
</List>; */
}
