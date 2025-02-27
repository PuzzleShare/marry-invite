"use client";

import * as React from 'react';
import Image from "next/image";
import styles from "../styles/page.module.css";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Header from "../components/Header"
import Main from "../components/Main"
import Mypage from "../components/Mypage"
import CreatePage from "../components/CreatePage"
import CreateButton from "../components/CreateButton"

export default function Home() {
  const [content, setContent] = React.useState("Main");

  let contentControl = null;
  if (content == "Main") {
    contentControl =
      <div>
        <Main />
        <CreateButton setContent={setContent} />
      </div>;
  } else if (content == "Mypage") {
    contentControl =
      <div>
        <Mypage />
        <CreateButton setContent={setContent} />
      </div>;
  } else if (content == "CreatePage") {
    contentControl =
      <CreatePage />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header setContent={setContent} />
      {contentControl}
    </React.Fragment>
  );
}
