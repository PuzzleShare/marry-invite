"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

export default function SharePage() {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("inviteId");

  return <>/invite?inviteId={inviteId} 왔냐?</>;
}
