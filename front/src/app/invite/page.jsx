"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Suspense>
        <Container>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <BlockTree />
            <Content />
            <Controller />
          </Stack>
        </Container>
      </Suspense>
    </React.Fragment>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InviteIdLoader />
    </Suspense>
  );
}