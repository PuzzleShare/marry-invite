import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END,
  withCredentials: true,
});

export default apiClient;
