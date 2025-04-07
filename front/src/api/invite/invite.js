import apiClient from "@/lib/axios";

export const getInviteList = async () => {
  try {
    const { data } = await apiClient.get(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/invite`
    );
    return data;
  } catch (error) {
    console.error("getInviteList API 요청 실패:", error);
    alert("청첩장 목록을 불러오는데 실패했습니다.");
    return null;
  }
};

export const getInvite = async (inviteId) => {
  try {
    const { data } = await apiClient.get(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/invite/${inviteId}`
    );
    return data;
  } catch (error) {
    console.error("getInvite API 요청 실패:", error);
    alert("청첩장을 불러오는데 실패했습니다.");
    return null;
  }
};

export const createInvite = async () => {
  try {
    const { data } = await apiClient.post(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/invite`
    );
    return data;
  } catch (error) {
    console.error("createInvite API 요청 실패:", error);
    alert("청첩장을 생성하는데 실패했습니다.");
    return null;
  }
};

export const modifyInvite = async (inviteId) => {
  try {
    const { data } = await apiClient.patch(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/invite/${inviteId}`
    );
    return data;
  } catch (error) {
    console.error("modifyInvite API 요청 실패:", error);
    alert("청첩장을 수정하는데 실패했습니다.");
    return null;
  }
};

export const removeInvite = async (inviteId) => {
  try {
    const { data } = await apiClient.delete(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/invite/${inviteId}`
    );
    return data;
  } catch (error) {
    console.error("removeInvite API 요청 실패:", error);
    alert("청첩장을 삭제하는데 실패했습니다.");
    return null;
  }
};
