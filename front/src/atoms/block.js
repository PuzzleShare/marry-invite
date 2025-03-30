import { atom } from "jotai";

const dummyData = {
  title: "철수 ❤️ 영희",
  bgm: "",
  content: [
    {
      type: "text", // => p 태그
      blockName: "Text",
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
      blockName: "Gallery",
      style: {},
      content: ["imgUrl1"],
    },
    {
      type: "guest_book",
      blockName: "Guest Book",
      style: {},
      content: [],
    },
    {
      type: "calendar",
      blockName: "Calendar",
      style: {},
      content: ["2025-04-17T15:30"], // yyyy.MM.dd hh:mm
    },
    {
      type: "map",
      blockName: "Map",
      style: {},
      content: ["[주소]", "[상세주소]", "37.3595704", "127.105399"],
    },
    {
      type: "blocks",
      blockName: "Nested",
      style: {},
      content: [
        {
          type: "blocks",
          blockName: "Nested",
          style: { display: "none" },
          content: [
            {
              type: "text", // => p 태그
              blockName: "Text",
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
              blockName: "Gallery",
              style: {},
              content: ["imgUrl1"],
            },
            {
              type: "guest_book",
              blockName: "Guest Book",
              style: {},
              content: [],
            },
            {
              type: "calendar",
              blockName: "Calendar",
              style: {},
              content: ["2025-06-17T15:30"], // yyyy.MM.dd hh:mm
            },
            {
              type: "map",
              blockName: "Map",
              style: {},
              content: ["위도", "경도", "주소", "상세주소"],
            },
          ],
        },
        {
          type: "text", // => p 태그
          blockName: "Text",
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
          blockName: "Gallery",
          style: {},
          content: ["imgUrl1"],
        },
        {
          type: "guest_book",
          blockName: "Guest Book",
          style: {},
          content: [],
        },
        {
          type: "calendar",
          blockName: "Calendar",
          style: {},
          content: ["2025-05-17T15:30"], // yyyy.MM.dd hh:mm
        },
        {
          type: "map",
          blockName: "Map",
          style: {},
          content: ["위도", "경도", "주소", "상세주소"],
        },
      ],
    },
  ],
};

export const blockDataAtom = atom(dummyData);
export const selectedBlockAtom = atom({ block: null, path: [] });
