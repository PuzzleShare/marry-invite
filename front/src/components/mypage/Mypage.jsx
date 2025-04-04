"use client";
import * as React from "react";
import InviteCard from "@/components/mypage/InviteCard";
import { Box, Grid2 as Grid } from "@mui/material";

export default function Mypage() {
  const inviteCards = [
    {
      imgUrl:
        "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      imgUrl:
        "https://plus.unsplash.com/premium_photo-1664790560217-f9d1b375b7eb?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1525772764200-be829a350797?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1532713031318-db2d14e4b3e1?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {inviteCards.map((inviteCard, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <InviteCard inviteCard={inviteCard} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
