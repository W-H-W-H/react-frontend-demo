import { FC, ReactElement, useState } from "react";
import { register } from "../api/Authentication";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupComponent : FC = () : ReactElement => {

    type InputEvent = React.ChangeEvent<HTMLInputElement>;
    type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

    const authContext = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("waiting.15@gmail.com");
    const [password, setPassword] = useState<string>("dummypassword");
    const [displayName, setDisplayName] = useState<string>("Wai Ting 15");

    function changeUsername(event: InputEvent){
        setUsername(event.target.value);
    }

    function changePassword(event: InputEvent){
        setPassword(event.target.value);
    }

    function changeDisplayName(event : InputEvent){
        setDisplayName(event.target.value);
    }
    
    
    function handleSubmit() {
        register(username, displayName, password)
        .then(
            async (repsonse) => {
                if(await authContext?.login(username, password)){
                    navigate("/home");
                }
            }
        )
        .catch(
            (error) => {

            }
        );
    }

    const handleKeyDown = async (event : KeyboardEvent) => {
        if (event.key === "Enter"){
            await handleSubmit();
        }   
    }
    

    return (
        <div className="form-container">
            <form className="form">
                <h1 className="form-title">Register Your Account</h1>
                <div>
                    <input className="form-input" type="email" id="username" name="useranme" value={username} onChange={changeUsername} onKeyDown={handleKeyDown} autoComplete="false" autoFocus={true} placeholder="Email"/>
                </div>
                <div>
                    <input className="form-input" type="password" id="password" name="password" value={password} onChange={changePassword} onKeyDown={handleKeyDown} autoComplete="false" placeholder="Password"/>
                </div>
                <div>
                    <input className="form-input" type="displayName" id="displayName" name="displayName" value={displayName} onChange={changeDisplayName} onKeyDown={handleKeyDown} autoComplete="false" placeholder="Your Name"/>
                </div>
                <div>
                    <button className="form-submit-button" type="button" name="login" onClick={handleSubmit}>Signup</button>
                    <button className="form-submit-button" type="button" name="switch" onClick={() => navigate("/login")}>Back to login page</button>
                </div>
            </form>
        </div>
    );
}

export default SignupComponent;