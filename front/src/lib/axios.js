import axios from "axios";

const API_BASE_URL = "https://marry-invite.site";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export default apiClient;
