"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { blockDataAtom } from "@/atoms/block";

import apiClient from "@/lib/axios";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import Header from "@/components/Header";
import BlockTree from "@/components/create/BlockTree";
import Content from "@/components/create/Content";
import Controller from "@/components/create/Controller";

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
      <Container>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <BlockTree blockData={blockData} setBlockData={setBlockData} />
          <Content blockData={blockData} setBlockData={setBlockData} />
          <Controller blockData={blockData} setBlockData={setBlockData} />
        </Stack>
      </Container>
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
