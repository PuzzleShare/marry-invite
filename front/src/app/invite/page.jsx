"use client";
import * as React from "react";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { blockDataAtom } from "@/atoms/block";
import { getInvite } from "@/api/invite/invite";

import { CssBaseline, Box, Stack, Divider } from "@mui/material";
import { Header } from "@/components";
import {
  BlockTreeContainer,
  Content,
  Controller,
  IntroEditor,
  Loading,
} from "@/components/invite";

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
    const getData = async () => {
      const data = await getInvite(inviteId);
      if (data) {
        setBlockData(data.data);
      } else {
        alert("청첩장을 불러오는데 실패했습니다.");
      }
    };
    getData();
  }, []);

  if (blockData == null)
    return (
      <Box height="calc(100vh - 64px)">
        <Loading />
      </Box>
    );
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
          <Stack
            direction="column"
            spacing={2}
            height="calc(100vh - 64px)"
            divider={<Divider orientation="horizontal" flexItem />}
          >
            <IntroEditor />
            <BlockTreeContainer />
          </Stack>
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
