import * as React from "react";
import Image from "next/image";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import naverLogo from "@/assets/login/naver_logo.png";
import kakaoLogo from "@/assets/login/kakao_logo.png";
import googleLogo from "@/assets/login/google_logo.png";

export default function Login(props) {
  return (
    <Dialog
      open={props.loginOpen}
      onClose={() => {
        props.setLoginOpen(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ textAlign: "center" }}>Login</DialogTitle>
      <DialogContent>
        <Button
          onClick={() => {
            props.setAuth(true);
            props.setLoginOpen(false);
          }}
          sx={{
            color: "white",
            background: "#03c75a",
            width: "100%",
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          <Image src={naverLogo} height={20} alt="네이버 로고" />
          NAVER
        </Button>
        <Button
          onClick={() => {
            props.setAuth(true);
            props.setLoginOpen(false);
          }}
          sx={{
            color: "rgb(0 0 0 / 85%)",
            background: "#FEE500",
            width: "100%",
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          <Image src={kakaoLogo} height={20} alt="카카오 로고" />
          KAKAO
        </Button>
        <Button
          onClick={() => {
            props.setAuth(true);
            props.setLoginOpen(false);
          }}
          sx={{
            color: "#5f6368",
            background: "#ffffff",
            width: "100%",
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          <Image src={googleLogo} height={20} alt="구글 로고" />
          GOOGLE
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.setLoginOpen(false);
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
