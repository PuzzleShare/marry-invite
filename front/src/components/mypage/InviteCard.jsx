import * as React from "react";

import {
  IconButton,
  Card,
  CardActions,
  CardMedia,
  Button,
} from "@mui/material";

import {
  DeleteOutlined as DeleteOutlinedIcon,
  ContentCopy as ContentCopyIcon,
  LocalPostOfficeOutlined as LocalPostOfficeOutlinedIcon,
} from "@mui/icons-material";

export default function InviteCard({ inviteCard }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        width="358"
        height="426"
        image={inviteCard.imgUrl}
      />
      <CardActions sx={{ justifyContent: "space-between" }}>
        <div>
          <Button size="small" startIcon={<LocalPostOfficeOutlinedIcon />}>
            청첩장 보기
          </Button>
          <Button
            size="small"
            startIcon={<ContentCopyIcon />}
            sx={{ marginLeft: "10px" }}
          >
            링크 복사
          </Button>
        </div>
        <IconButton aria-label="delete" color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
