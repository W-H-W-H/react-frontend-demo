import { Dispatch, SetStateAction } from "react";
import { UserDetails } from "./UserDetails";

export interface IAuthContext {
    userDetails: UserDetails | null;
    setUserDetails: Dispatch<SetStateAction<UserDetails | null>>;
    login: ((userEmail: string, password: string) => Promise<boolean>);
    logout: (() => void);
}
