import * as React from "react";
import { useAtom } from "jotai";
import { commentsAtom } from "@/atoms/comment";
import { useSearchParams } from "next/navigation";

import { Loading } from "@/components/invite";
import { getCommentList, deleteCommentByAdmin } from "@/api/invite/comment";
import { Stack, Box, IconButton, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export default function GuestbookBlockController() {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("inviteId");
  const [comments, setComments] = useAtom(commentsAtom);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getCommentList(inviteId);
    setComments(data);
  };

  if (comments == null) return <Loading />;
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      width="100%"
      padding="2px"
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        방명록 목록
      </Typography>
      <Stack spacing={1} width="100%">
        {comments
          ? comments.map((comment, index) => (
              <CommentBox key={index} comment={comment} getData={getData} />
            ))
          : "작성된 방명록이 없습니다."}
      </Stack>
    </Box>
  );
}

function CommentBox({ comment, getData }) {
  const handleDelete = async () => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!isConfirmed) return;

    const result = await deleteCommentByAdmin(comment.commentId);
    if (result) {
      alert("삭제되었습니다!");
      getData();
    }
  };

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
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.text}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
