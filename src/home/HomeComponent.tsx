import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const HomeComponent: FC = () => {

    const navigate = useNavigate();
    const authContext = useAuth();

    return (
        <div className="message-container-layer1">
            <div className="message-container-layer2">
                <h1 className="message-container-title">Welcome to Alexandria</h1>
                <p className="message-cotainer-description">Greatest Library System in the world</p>
                <p className="message-cotainer-sub-description">Well, we are all Nietzschean fish in that regard</p>
                {
                    authContext?.userDetails === null && 
                    <div className="inline-block w-8/12">
                        <button className="form-submit-button" type="button" name="switch" onClick={() => navigate("/login")}>Go to login page</button>
                        <button className="form-submit-button" type="button" name="switch" onClick={() => navigate("/signup")}>Go to signup page</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default HomeComponent;