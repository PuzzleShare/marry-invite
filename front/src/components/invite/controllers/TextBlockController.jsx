import * as React from "react";
import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";
import App from "@/components/invite/lexical/App";

export default function TextBlockController() {
  return <App />;
}
