import * as React from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import OAuthButton from "@/components/OAuthButton";
import naverLogo from "@/assets/login/naver_logo.png";
import kakaoLogo from "@/assets/login/kakao_logo.png";
import googleLogo from "@/assets/login/google_logo.png";

export default function Login({ loginOpen, setLoginOpen }) {
  const [, setUser] = useAtom(userAtom);

  const oauth = [
    {
      logo: naverLogo,
      alt: "네이버 로고",
      content: "네이버 로그인",
      color: "white",
      background: "#03C75A",
      border: "none",
      key: "naver",
    },
    {
      logo: kakaoLogo,
      alt: "카카오 로고",
      content: "카카오 로그인",
      color: "rgba(0, 0, 0, 0.85)",
      background: "#FEE500",
      border: "none",
      key: "kakao",
    },
    {
      logo: googleLogo,
      alt: "구글글 로고",
      content: "구글 로그인",
      color: "#1F1F1F",
      background: "white",
      border: "1px solid #747775",
      key: "google",
    },
  ];

  return (
    <Dialog
      open={loginOpen}
      onClose={() => {
        setLoginOpen(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ textAlign: "center" }}>로그인</DialogTitle>
      <DialogContent sx={{ width: "300px" }}>
        {oauth.map((o) => (
          <OAuthButton setLoginOpen={setLoginOpen} oauth={o} key={o.key} />
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setLoginOpen(false);
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
