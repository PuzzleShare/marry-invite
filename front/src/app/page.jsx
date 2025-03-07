"use client";
import * as React from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import Header from "@/components/Header";
import Main from "@/components/Main";
import CreateButton from "@/components/CreateButton";

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
