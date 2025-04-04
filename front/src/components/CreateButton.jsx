import * as React from "react";

import { useRouter } from "next/navigation";
import { createInvite } from "@/api/invite/invite";

import { Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

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
        const data = await createInvite();
        if (data) {
          router.push(`/invite?inviteId=${data.inviteId}`);
        }
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
