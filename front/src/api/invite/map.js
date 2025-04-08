import apiClient from "@/lib/axios";

export const getCoordinates = async (address) => {
  try {
    const { data } = await apiClient.get(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/map/geocode`,
      {
        params: { address: address },
      }
    );
    return data;
  } catch (error) {
    console.error("Geocoding API 요청 실패:", error);
    alert("위치 정보를 가져오는 데 실패했습니다.");
    return null;
  }
};
