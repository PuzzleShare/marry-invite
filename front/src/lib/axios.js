import axios from "axios";

const API_BASE_URL = "https://marry-invite.site";

const apiClient = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: process.env.NEXT_PUBLIC_BACK_END,
  withCredentials: true,
});

export default apiClient;
