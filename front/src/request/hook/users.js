import axios from "@/request/axios";

const useUser = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACK_END}/api/login`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { useUser }