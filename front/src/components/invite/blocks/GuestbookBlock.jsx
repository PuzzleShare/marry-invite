import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Loading } from "@/components/invite";

import {
  saveComment,
  getCommentList,
  modifyComment,
  deleteComment,
} from "@/api/invite/comment";

import {
  Stack,
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";

import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

export default function GuestbookBlock({ block }) {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("inviteId");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [comments, setComments] = React.useState(null);
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState("");
  const [pw, setPassword] = React.useState("");
  const handleSubmit = async () => {
    if (!name || !text || !pw) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const comment = {
      pw,
      name,
      text,
    };

    const result = await saveComment(inviteId, comment);
    if (result) {
      alert("방명록이 등록되었습니다!");
      setName("");
      setText("");
      setPassword("");
      getData();
    }
  };

  const getData = async () => {
    const data = await getCommentList(inviteId);
    setComments(data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  if (comments == null) return <Loading />;
  return (
    <Box alignItems="center" display="flex" flexDirection="column" width="100%">
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        방명록
      </Typography>
      <Stack spacing={2} width="100%">
        <Box display="flex" flexDirection="column">
          <TextField
            label="이름"
            value={name}
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="내용"
            value={text}
            variant="standard"
            multiline
            maxRows={4}
            onChange={(e) => setText(e.target.value)}
            sx={{ marginTop: "8px" }}
          />
          <TextField
            label="비밀번호"
            value={pw}
            variant="standard"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginTop: "8px" }}
          />
          <Box display="flex" justifyContent="end" onClick={handleSubmit}>
            <Button>등록</Button>
          </Box>
        </Box>
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <Box
              padding="10px 16px 16px"
              borderRadius={"5px"}
              boxShadow={"0 1px 2px rgba(0,0,0,0.4)"}
            >
              <Box
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {comment.name}
                </Typography>
                <IconButton
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {comment.text}
              </Typography>
            </Box>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                수정
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                삭제
              </MenuItem>
            </Menu>
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
}
