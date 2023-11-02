import { apiClient } from "./ApiClient";

export const loginByUsernameAndPassword = (userEmail : string, password : string) => 
apiClient.post(
    `/auth/authenticate`, {userEmail, password}
);

export const register = (userEmail : string, displayName : string, password : string) => 
apiClient.post(
    "/auth/register", 
    {userEmail, displayName, password}
);

export const refreshAccessToken = () => apiClient.post("/auth/refresh-token");

export const logoutAndRevokeAllAccessToken = () => apiClient.post("auth/logout");
