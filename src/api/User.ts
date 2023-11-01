import { apiClient } from "./ApiClient";

export const getUserInfoById = () => apiClient.get("users");