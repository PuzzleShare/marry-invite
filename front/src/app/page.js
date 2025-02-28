"use client";

import * as React from "react";
import Image from "next/image";
import styles from "@/styles/page.module.css";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import Header from "@/components/Header";
import Main from "@/components/Main";
import Mypage from "@/components/Mypage";
import CreatePage from "@/components/CreatePage";
import CreateButton from "@/components/CreateButton";

export default function Home() {
  const [auth, setAuth] = React.useState(false);
  const [content, setContent] = React.useState("Main");

  let contentControl = null;
  if (content == "Main") {
    contentControl = (
      <>
        <Main />
        {auth && <CreateButton setContent={setContent} />}
      </>
    );
  } else if (content == "Mypage") {
    contentControl = (
      <>
        <Mypage />
        {auth && <CreateButton setContent={setContent} />}
      </>
    );
  } else if (content == "CreatePage") {
    contentControl = <CreatePage />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header setContent={setContent} setAuth={setAuth} auth={auth} />
      <Container>{contentControl}</Container>
    </React.Fragment>
  );
}
