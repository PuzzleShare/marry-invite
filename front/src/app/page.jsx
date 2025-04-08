"use client";
import * as React from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { CssBaseline, Container } from "@mui/material";
import { Header, Main, CreateButton } from "@/components";

export default function Home() {
  const [user] = useAtom(userAtom);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container sx={{ marginTop: "20px" }}>
        <Main />
      </Container>
      {user && <CreateButton />}
    </React.Fragment>
  );
}
