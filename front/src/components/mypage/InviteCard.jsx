import * as React from "react";

import {
  IconButton,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Button,
  CardContent,
  Typography,
  styled,
} from "@mui/material";

import {
  DeleteOutlined as DeleteOutlinedIcon,
  ContentCopy as ContentCopyIcon,
  LocalPostOfficeOutlined as LocalPostOfficeOutlinedIcon,
} from "@mui/icons-material";
import { getDefaultImg } from "@/const/defaultCardImg";
import axios from "@/lib/axios";
import { getInviteList, removeInvite } from "@/api/invite/invite";
import { useRouter } from "next/navigation";

const InviteCardContent = styled(CardContent)`
  padding-bottom: 0;
`;

export default function InviteCard({ inviteCard, setInviteCards }) {
  const router = useRouter();

  const removeInviteCard = async () => {
    const result = await removeInvite(inviteCard.inviteId);
    if (result.success) {
      const list = await getInviteList();
      if (list) {
        setInviteCards(list);
      }
    } else {
      alert(result.messege);
    }
  };

  const copyInviteLink = async () => {
    navigator.clipboard.writeText(
      `https://marry-invite.site/invite/${inviteCard.inviteId}`
    );
  };

  const move4InviteUpdate = async () => {
    router.push(`/invite?inviteId=${inviteCard.inviteId}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        width="358"
        height="426"
        image={inviteCard.imgUrl || getDefaultImg()}
      />
      <InviteCardContent>
        <Typography variant="h7">
          {inviteCard.title || "타이틀이 정해지지 않았습니다."}
        </Typography>
      </InviteCardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <div>
          <Button
            size="small"
            startIcon={<LocalPostOfficeOutlinedIcon />}
            onClick={move4InviteUpdate}
          >
            청첩장 수정
          </Button>
          <Button
            size="small"
            startIcon={<ContentCopyIcon />}
            sx={{ marginLeft: "10px" }}
            onClick={copyInviteLink}
          >
            링크 복사
          </Button>
        </div>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={removeInviteCard}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
