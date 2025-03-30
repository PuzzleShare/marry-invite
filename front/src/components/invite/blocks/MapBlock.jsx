import * as React from "react";

import { Typography, Box } from "@mui/material";

export default function MapBlock({ block }) {
  const [roadAddress, setRoadAddress] = React.useState("");
  const [detailAddr, setDetailAddr] = React.useState("");
  const [x, setX] = React.useState(null);
  const [y, setY] = React.useState(null);

  const mapRef = React.useRef(null);

  React.useEffect(() => {
    const [roadAddr, detailAddr, x, y] = block.content;
    setRoadAddress(roadAddr);
    setDetailAddr(detailAddr);

    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_KEY_ID}`;
    script.async = true;
    script.onload = () => {
      if (window.naver && mapRef.current) {
        const map = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(x, y),
          zoom: 15,
        });

        new naver.maps.Marker({
          position: new naver.maps.LatLng(x, y),
          map: map,
        });
      }
    };
    document.head.appendChild(script);
  }, [block.content]);

  return (
    <Box style={{ width: "100%", aspectRatio: "1 / 0.5", padding: "10px 0" }}>
      <Typography variant="h6" gutterBottom>
        {roadAddress}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {detailAddr}
      </Typography>
      <Box ref={mapRef} sx={{ width: "100%", height: "100%" }} />
    </Box>
  );
}
