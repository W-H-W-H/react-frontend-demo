import { UserDetails } from "./UserDetails";

export class LocalStorageDao {

    static getAccessToken(){
        console.log("Invoked getAccessToken with accessToken=" + localStorage.getItem('accessToken'));
        return localStorage.getItem('accessToken');
    }
    
    static setAccessToken(accessToken : string){
        localStorage.setItem('accessToken', accessToken);
    }
    

    static getRefreshToken(){
        return localStorage.getItem('refreshToken');
    }

    static setRefreshToken(refreshToken : string){
        localStorage.setItem('refreshToken', refreshToken)
    }

    static getUserDetails(){
        const userDetailsInStringFormat = localStorage.getItem('userDetails');
        if (userDetailsInStringFormat ===null){
            return null;
        }else{
            return JSON.parse(userDetailsInStringFormat);
        }
    }

    static setUserDetails(userDetails : UserDetails){
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }

    static clear(){
        localStorage.clear();
    }


}

