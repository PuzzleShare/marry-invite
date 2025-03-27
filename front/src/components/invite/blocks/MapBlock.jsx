import * as React from "react";

export default function MapBlock({ block }) {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    const [latitude, longitude, address, detailAddr] = block.content;
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_KEY_ID}`;
    script.async = true;
    script.onload = () => {
      if (window.naver && mapRef.current) {
        const map = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(latitude, longitude),
          zoom: 15,
        });

        new naver.maps.Marker({
          position: new naver.maps.LatLng(latitude, longitude),
          map: map,
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", aspectRatio: "1 / 0.5" }} />;
}
