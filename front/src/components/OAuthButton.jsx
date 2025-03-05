import * as React from "react";
import Image from "next/image";

import Button from "@mui/material/Button";

export default function OAuthButton(props) {
  return (
    <Button
      onClick={() => {
        props.setAuth(true);
        props.setLoginOpen(false);
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
        height={props.oauth.size}
        style={{ objectFit: "contain" }}
      />
      <span style={{ flex: 1, textAlign: "center" }}>
        {props.oauth.content}
      </span>
    </Button>
  );
}
