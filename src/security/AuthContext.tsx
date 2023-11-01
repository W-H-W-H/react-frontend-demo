import { Dispatch, FC, ReactElement, SetStateAction, createContext, useContext, useState } from "react";
import { Role } from "./Roles";
import { loginByUsernameAndPassword, logoutAndRevokeAllAccessToken, refresh_token } from "../api/Authentication";
import { apiClient } from "../api/ApiClient";
import { jwtDecode } from "jwt-decode";

interface IProps {
    children : ReactElement;
}

interface UserDetails {
    userEmail : string,
    roles : Role[],
    accessToken : string,
    refreshToken: string,
}

type IAuthContext = {
    userDetails : UserDetails | null,
    setUserDetails : Dispatch<SetStateAction<UserDetails|null>>
    login : ((userEmail: string, password: string) => Promise<boolean>),
    logout : (() => void)
} 

interface DecodedJwtPlayload {
    roles : string[],
    sub : string,
    iat: number,
    exp: number
}


const AuthContext = createContext<IAuthContext|null>(null);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error("AuthContext must be used within AuthContextProvider");
    }
    return context;
};

const AuthProvider : FC<IProps> = ( { children } )  => {

    const [userDetails, setUserDetails] = useState<UserDetails|null>(null);

    async function login(userEmail : string, password : string) : Promise<boolean>{
        try{
            const response = await loginByUsernameAndPassword(userEmail, password);
            if (response.status === 200){
                const accessToken : string = response.data.accessToken;
                const refreshToken : string = response.data.refreshToken;

                apiClient.interceptors.request.use(
                    (config)=>{
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
                            apiClient.defaults.headers['Authorization'] = response.data.accessToken;
                            console.log("Retry the request");
                            return apiClient(originalRequest);
                        }
                        return Promise.reject(error);
                    }
                );

                const decodedInfo = jwtDecode(accessToken) as DecodedJwtPlayload;
                const roles = decodedInfo.roles.map( roleName => roleMapper(roleName) );

                const userDetails = {
                    userEmail,
                    roles,
                    accessToken,
                    refreshToken
                };

                console.log("Set UserDetails.userEmail=" + userDetails.userEmail);
                setUserDetails(userDetails);
                return true;
            }else{
                setUserDetails(null);
                return false;
            }
        }catch(error){
            return false;
        }
    } 

    async function logout(){
        logoutAndRevokeAllAccessToken()
            .then((response)=>{})
            .catch((error)=>{});
        setUserDetails(null);
    }

    function roleMapper(roleName : string) : Role{
        switch(roleName){
            case "ROLE_MANAGER":
                return Role.MANAGER;
            case "ROLE_USER":
                return Role.USER
            case "ROLE_ADMIN":
                return Role.ADMIN;
            default: return Role.USER;
        }
    }
    
    
    return (
        <AuthContext.Provider value = { {userDetails, setUserDetails, login, logout } }>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;

export {useAuth};