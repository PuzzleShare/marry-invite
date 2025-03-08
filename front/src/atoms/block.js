import { atom } from "jotai";

const dummyData = {
  title: "철수 ❤️ 영희",
  bgm: "",
  content: [
    {
      type: "blocks",
      blockName: "",
      style: {},
      content: [],
    },
    {
      type: "text", // => p 태그
      style: {},
      content: [
        {
          text: "내용", // => span 태그 shift + enter => \n => <br/>
          style: {},
        },
      ],
    },
    {
      type: "gallery",
      style: {},
      content: ["imgUrl1"],
    },
    {
      type: "guest_book",
      style: {},
      content: [],
    },
    {
      type: "calendar",
      style: {},
      content: ["2025.03.08 15:30"], // yyyy.MM.dd hh:mm
    },
    {
      type: "map",
      style: {},
      content: ["위도", "경도", "주소", "상세주소"],
    },
  ],
};

export const blockDataAtom = atom(dummyData);
