import axios from "axios"
import { LocalStorageDao } from "../security/LocalStorageDao";
import { refreshAccessToken } from "./Authentication";

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080/api/v1'
    }
);

apiClient.interceptors.request.use(
    (config)=>{
        const accessToken = LocalStorageDao.getAccessToken();
        const refreshToken = LocalStorageDao.getRefreshToken();
        config.headers.setAuthorization(`Bearer ${accessToken}`);
        config.headers.set("Refresh-Token", `Bearer ${refreshToken}`);
        config.headers.setContentType('application/json');
        return config;
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if(error.response.status === 403 && !originalRequest._retry){
            originalRequest._retry = true;
            const response = await refreshAccessToken();
            const newAccessToken = response.data.accessToken;
            LocalStorageDao.setAccessToken(newAccessToken);
            console.log(`Request ${originalRequest} failed, retry the request`);
            return apiClient(originalRequest);
        }else{
            return Promise.reject(error);
        }
        
    }
);