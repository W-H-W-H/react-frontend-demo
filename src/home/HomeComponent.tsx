import { FC, useEffect } from "react";
import { useAuth } from "../security/AuthContext";

const HomeComponent: FC = () => {

    const authContext = useAuth();

    useEffect(
        () => {
            const cookie = document.cookie;

            console.log("=========BEGIN=========");
            console.log("userEmail=" + authContext?.userDetails?.userEmail);
            console.log("roles=" + authContext?.userDetails?.roles);
            console.log("accessToken=" + authContext?.userDetails?.accessToken);
            console.log("refreshToken=" + authContext?.userDetails?.refreshToken);
            console.log("cookie=" + cookie);
            console.log("=========END=========");
        }
    ,[authContext]);

    return (
        <div>Welcome</div>
    );
}

export default HomeComponent;