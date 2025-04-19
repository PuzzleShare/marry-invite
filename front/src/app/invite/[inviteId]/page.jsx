import { getInvite } from "@/api/invite/invite";
import * as React from "react";
import Content from "./_components/Content";

// metadata 설정해주는 함수
export async function generateMetadata({ params, searchParams }, parent) {
  const { inviteId } = await params;
  const invite = await getInvite(inviteId);
  const previousImages = [invite?.images];

  return {
    title: invite?.title || "marry-invite",
    openGraph: {
      images: previousImages,
    },
  };
}

export default async function SharePage({ params }) {
  const { inviteId } = await params;
  const invite = await getInvite(inviteId);
  if (!invite) {
    return <div>청첩장을 불러오는데 실패했습니다.</div>;
  }
  return (
    <>
      <Content blockData={invite.data} />
    </>
  );
}
