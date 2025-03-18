import * as React from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

import Button from "@mui/material/Button";

export default function OAuthButton(props) {
  const [, setUser] = useAtom(userAtom); // todo: 나중에 지우기

  // todo: 소셜로그인 연동하기
  const goLogin = (provider) =>
    (window.location.href = `${process.env.NEXT_PUBLIC_BACK_END}/oauth2/authorization/${provider}`);

  return (
    <Button
      onClick={() => {
        goLogin(props.oauth.key);
      }}
      sx={{
        color: props.oauth.color,
        background: props.oauth.background,
        width: "100%",
        height: "40px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "16px",
        border: props.oauth.border,
      }}
    >
      <Image
        src={props.oauth.logo}
        alt={props.oauth.alt}
        layout="intrinsic"
        height={20}
        style={{ objectFit: "contain" }}
      />
      <span style={{ flex: 1, textAlign: "center" }}>
        {props.oauth.content}
      </span>
    </Button>
  );
}
