import { getInvite } from "@/api/invite/invite";
import * as React from "react";
import Content from "./_components/Content";

export default async function SharePage({ params }) {
  const { inviteId } = await params;
  const invite = await getInvite(inviteId);
  if (!invite) {
    return <div>청첩장을 불러오는데 실패했습니다.</div>;
  }
  return <Content blockData={invite.data} />;
}
