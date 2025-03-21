"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { blockDataAtom } from "@/atoms/block";

import apiClient from "@/lib/axios";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import Header from "@/components/Header";
import BlockTree from "@/components/invite/BlockTree";
import Content from "@/components/invite/Content";
import Controller from "@/components/invite/Controller";

function InviteIdLoader() {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("inviteId");
  return <CreatePage inviteId={inviteId} />;
}

function CreatePage({ inviteId }) {
  const [user] = useAtom(userAtom);
  const [blockData, setBlockData] = useAtom(blockDataAtom);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // 블럭 데이터 가져오기
    // apiClient
    //   .get(`/invite?inviteId=${inviteId}`, {
    //     headers: { Authorization: `Bearer ${user.token}` },
    //   })
    //   .then((response) => {
    //     setBlockData(response.data);
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   });
  }, []);

  if (blockData == null) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Box sx={{ maxWidth: 1300, padding: "0 24px", margin: "auto" }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Box sx={{ paddingTop: "8px", minWidth: "300px" }}>
            <BlockTree content={blockData.content} />
          </Box>
          <Content />
          <Controller />
        </Stack>
      </Box>
    </React.Fragment>
  );
}

export default function Page() {
  return (
    <Suspense>
      <InviteIdLoader />
    </Suspense>
  );
}
