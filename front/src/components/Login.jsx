import * as React from "react";
import axios from "axios";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { OAuthButton } from "@/components";
import { naverLogo, kakaoLogo, googleLogo } from "@/assets/login";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

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
          <OAuthButton oauth={o} key={o.key} />
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
