import * as React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function CreateButton() {
  const router = useRouter();

  const getInviteId = async () => {
    // try {
    //   const token = "USER_TOKEN";    // 유저 토큰 받아오기
    //   const response = await axios.get("https://marry-invite.site/api/invite", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   return response.data;
    // } catch (error) {
    //   console.error("Error:", error);
    //   return null;
    // }
    return "20250306abcdef";
  };

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
      onClick={async () => {
        const inviteId = await getInviteId();
        router.push(`/invite?inviteId=${inviteId}`);
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
