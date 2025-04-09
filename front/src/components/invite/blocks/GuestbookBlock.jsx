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

  const getData = async () => {
    const data = await getCommentList(inviteId);
    setComments(data);
  };

  const [comments, setComments] = React.useState(null);
  React.useEffect(() => {
    getData();
  }, []);

  if (comments == null) return <Loading />;
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      width="100%"
      sx={{ ...block.style }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        방명록
      </Typography>
      <Stack spacing={2} width="100%">
        <SaveCommentBox inviteId={inviteId} getData={getData} />
        {comments.map((comment, index) => (
          <CommentItem key={index} comment={comment} getData={getData} />
        ))}
      </Stack>
    </Box>
  );
}

function SaveCommentBox({ inviteId, getData }) {
  const [pw, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState("");
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
      setName("");
      setText("");
      setPassword("");
      getData();
      alert("방명록이 등록되었습니다!");
    }
  };

  return (
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
      <Box display="flex" justifyContent="end">
        <Button onClick={handleSubmit}>등록</Button>
      </Box>
    </Box>
  );
}

function CommentBox({ comment, onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <Box
        padding="10px 16px 16px"
        borderRadius="5px"
        boxShadow="0 1px 2px rgba(0,0,0,0.4)"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {comment.name}
          </Typography>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.text}
        </Typography>
      </Box>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            onEdit();
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
            onDelete();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          삭제
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

function ModifyCommentBox({ comment, onCancel, getData }) {
  const [pw, setPassword] = React.useState("");
  const [name, setName] = React.useState(comment.name);
  const [text, setText] = React.useState(comment.text);

  const handleSubmit = async () => {
    const result = await modifyComment(comment.commentId, { pw, name, text });
    if (result) {
      alert("수정되었습니다!");
      getData();
      onCancel();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="16px"
      borderRadius="5px"
      boxShadow="0 1px 2px rgba(0,0,0,0.4)"
    >
      <TextField
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="내용"
        value={text}
        multiline
        maxRows={4}
        onChange={(e) => setText(e.target.value)}
        sx={{ mt: 1 }}
      />
      <TextField
        label="비밀번호"
        type="password"
        variant="standard"
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mt: 1 }}
      />
      <Box display="flex" justifyContent="end" mt={1}>
        <Button onClick={onCancel}>취소</Button>
        <Button color="success" onClick={handleSubmit}>
          수정
        </Button>
      </Box>
    </Box>
  );
}

function DeleteCommentBox({ comment, onCancel, getData }) {
  const [pw, setPassword] = React.useState("");

  const handleDelete = async () => {
    const result = await deleteComment(comment.commentId, { pw });
    if (result) {
      alert("삭제되었습니다!");
      getData();
      onCancel();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="16px"
      borderRadius="5px"
      boxShadow="0 1px 2px rgba(0,0,0,0.4)"
    >
      <TextField
        label="비밀번호"
        type="password"
        variant="standard"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box display="flex" justifyContent="end" mt={1}>
        <Button onClick={onCancel}>취소</Button>
        <Button color="error" onClick={handleDelete}>
          삭제
        </Button>
      </Box>
    </Box>
  );
}

function CommentItem({ comment, getData }) {
  const [mode, setMode] = React.useState("view"); // "view" | "edit" | "delete"

  const handleCancel = () => {
    setMode("view");
  };

  if (mode === "edit") {
    return (
      <ModifyCommentBox
        comment={comment}
        onCancel={handleCancel}
        getData={getData}
      />
    );
  }

  if (mode === "delete") {
    return (
      <DeleteCommentBox
        comment={comment}
        onCancel={handleCancel}
        getData={getData}
      />
    );
  }

  return (
    <CommentBox
      comment={comment}
      onEdit={() => setMode("edit")}
      onDelete={() => setMode("delete")}
    />
  );
}
