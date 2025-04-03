"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { blockDataAtom } from "@/atoms/block";

import { CssBaseline, Box, Stack, Divider } from "@mui/material";
import { Header } from "@/components";
import { BlockTreeContainer, Content, Controller } from "@/components/invite";

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
          <BlockTreeContainer />
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
