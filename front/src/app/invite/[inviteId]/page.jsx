import * as React from "react";

export default async function SharePage({ params }) {
  const { inviteId } = await params;
  return <>/invite/{inviteId} 왔냐?</>;
}
