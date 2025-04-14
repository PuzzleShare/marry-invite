import apiClient from "@/lib/axios";

export const saveComment = async (inviteId, comment) => {
  try {
    const { data } = await apiClient.post(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/${inviteId}/comment`,
      comment
    );
    return data;
  } catch (error) {
    console.error("saveComment API 요청 실패:", error);
    alert("방명록 작성에 실패했습니다.");
    return null;
  }
};

export const getCommentList = async (inviteId) => {
  try {
    const { data } = await apiClient.get(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/${inviteId}/comment`
    );
    return data;
  } catch (error) {
    console.error("getCommentList API 요청 실패:", error);
    alert("방명록 목록을 불러오는데 실패했습니다.");
    return null;
  }
};

export const modifyComment = async (commentId, comment) => {
  try {
    const { data } = await apiClient.put(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/comment/${commentId}`,
      comment
    );
    return data;
  } catch (error) {
    console.error("modifyComment API 요청 실패:", error);
    alert("방명록을 수정하는데 실패했습니다.");
    return null;
  }
};

export const deleteComment = async (commentId, pw) => {
  try {
    const { data } = await apiClient.delete(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/comment/${commentId}`,
      { data: pw }
    );
    return data;
  } catch (error) {
    console.error("deleteComment API 요청 실패:", error);
    alert("방명록을 삭제하는데 실패했습니다.");
    return null;
  }
};

export const deleteCommentByAdmin = async (commentId) => {
  try {
    const { data } = await apiClient.delete(
      `${process.env.NEXT_PUBLIC_BACK_END}/api/comment/${commentId}/admin`
    );
    return data;
  } catch (error) {
    console.error("deleteComment API 요청 실패:", error);
    alert("방명록을 삭제하는데 실패했습니다.");
    return null;
  }
};
