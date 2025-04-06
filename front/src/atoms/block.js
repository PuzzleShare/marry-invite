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
      content: [
        "https://images.unsplash.com/photo-1549388604-817d15aa0110",
        "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
        "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
        "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
        "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
        "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
        "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
        "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
        "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
        "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
        "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
      ],
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
      content: ["", "", "", ""],
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

export const blockDataAtom = atom(null);
export const selectedBlockAtom = atom({ block: null, path: [] });
