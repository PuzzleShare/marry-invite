import apiClient from "@/lib/axios";

export const uploadFile = async (formData) => {
  try {
    const { data } = await apiClient.post(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/file`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    data.url =
      "https://marry-invite.s3.ap-northeast-2.amazonaws.com/" + data.url;
    return data;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    alert("사진 업로드 실패!");
    return null;
  }
};
