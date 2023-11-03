import { FC, ReactElement, createContext, useContext, useState } from "react";
import { roleNameMapper } from "./Role";
import { loginByUsernameAndPassword, logoutAndRevokeAllAccessToken} from "../api/Authentication";
import { jwtDecode } from "jwt-decode";
import { UserDetails } from "./UserDetails";
import { IAuthContext } from "./IAuthContext";
import { LocalStorageDao } from "./LocalStorageDao";

const AuthContext = createContext<IAuthContext|null>(null);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error("AuthContext must be used within AuthContextProvider");
    }
    return context;
};

interface IAuthProviderProps {
    children : ReactElement;
}

const AuthProvider : FC<IAuthProviderProps> = ( { children } )  => {

    const [userDetails, setUserDetails] = useState<UserDetails|null>(LocalStorageDao.getUserDetails());

    interface DecodedJwtPlayload {
        roles : string[],
        sub : string,
        iat: number,
        exp: number
    }

    async function login(userEmail : string, password : string) : Promise<boolean>{
        try{
            const response = await loginByUsernameAndPassword(userEmail, password);
            if (response.status === 200){
                const accessToken : string = response.data.accessToken;
                const refreshToken : string = response.data.refreshToken;

                LocalStorageDao.setAccessToken(accessToken);
                LocalStorageDao.setRefreshToken(refreshToken);

                const decodedInfo = jwtDecode(accessToken) as DecodedJwtPlayload;
                const roles = decodedInfo.roles.map( roleName => roleNameMapper(roleName) );

                const userDetails = {
                    userEmail,
                    roles
                };
                setUserDetails(userDetails);
                LocalStorageDao.setUserDetails(userDetails);
                return true;
            }else{
                setUserDetails(null);
                LocalStorageDao.clear();
                return false;
            }
        }catch(error){
            return false;
        }
    } 

    async function logout(){
        setUserDetails(null);
        LocalStorageDao.clear();
        await logoutAndRevokeAllAccessToken();
    }
    
    return (
        <AuthContext.Provider value = { {userDetails, setUserDetails, login, logout } }>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;

export {useAuth};