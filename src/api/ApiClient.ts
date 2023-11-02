import axios from "axios"
import { LocalStorageDao } from "../security/LocalStorageDao";
import { refresh_token } from "./Authentication";

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080/api/v1'
    }
);

apiClient.interceptors.request.use(
    (config)=>{
        const accessToken = LocalStorageDao.getAccessToken();
        console.log("Request invoked, accessToken=" + accessToken);
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
            const response = await refresh_token();
            const newAccessToken = response.data.accessToken;
            apiClient.defaults.headers['Authorization'] = newAccessToken;
            LocalStorageDao.setAccessToken(newAccessToken);
            console.log("Retry the request");
            return apiClient(originalRequest);
        }else{
            return Promise.reject(error);
        }
        
    }
);