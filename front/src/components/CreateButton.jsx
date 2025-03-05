import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function CreateButton(props) {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        width: "80px",
        height: "80px",
        position: "fixed",
        bottom: 80,
        right: 50,
        zIndex: 1000,
      }}
      onClick={() => {
        props.setContent("CreatePage");
      }}
    >
      <AddIcon
        sx={{
          width: "50%",
          height: "50%",
        }}
      />
    </Fab>
  );
}
