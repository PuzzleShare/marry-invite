import * as React from "react";
import { scrollStyle } from "@/styles/scroll";
import { Box, ImageList, ImageListItem } from "@mui/material";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/scrollbar";

export default function GalleryBlock({ block }) {
  if (block?.shape?.type === "gallery") {
    return <Gallery block={block} />;
  }

  if (block?.shape?.type === "slider") {
    return <Slider block={block} />;
  }

  return null;
}

function Gallery({ block }) {
  return (
    <Box
      width="100%"
      sx={{
        ...block.style,
        ...scrollStyle,
      }}
    >
      <ImageList variant="masonry" cols={3} gap={8} sx={{ margin: 0 }}>
        {block.content.map((item, index) => (
          <ImageListItem key={index}>
            <img src={item} alt="Gallery image" loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

function Slider({ block }) {
  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow, Scrollbar]}
      effect="coverflow"
      loop={true}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      scrollbar={{ draggable: true }} // ✅ 스크롤바 활성화
      style={{
        width: "100%",
        paddingBottom: "40px",
      }}
    >
      {block.content.map((item, index) => (
        <SwiperSlide
          key={index}
          style={{
            width: "300px", // 고정된 가로 크기 (3:4 비율 유지)
            height: "400px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src={item}
            alt={`Gallery image ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
