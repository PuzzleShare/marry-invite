import apiClient from "@/lib/axios";

const useUser = async () => {
  try {
    const { data } = await apiClient.get(`${process.env.NEXT_PUBLIC_BACK_END}/api/login`);
    return typeof data === 'string' ? null : data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { useUser }