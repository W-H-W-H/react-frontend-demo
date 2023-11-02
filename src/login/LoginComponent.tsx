import { FC, ReactElement, useState } from "react";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginComponent : FC = () : ReactElement => {

    type InputEvent = React.ChangeEvent<HTMLInputElement>;
    type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

    const navigate = useNavigate();
    const authContext = useAuth();

    const [username, setUsername] = useState<string>("waiting.13@gmail.com");
    const [password, setPassword] = useState<string>("dummypassword");
    
    function changeUsername(event: InputEvent){
        setUsername(event.target.value);
    }

    function changePassword(event: InputEvent){
        setPassword(event.target.value);
    }
    
    async function handleSubmit() {
        if(await authContext?.login(username, password)){
            navigate("/home");
        }
    }

    const handleKeyDown = async (event : KeyboardEvent) => {
        if (event.key === "Enter"){
            await handleSubmit();
        }   
    }

    return (
        <div className="form-container">
            <form className="form">
                <h1 className="form-title">Please Login</h1>
                <div>
                    <input className="form-input" type="email" id="username" name="useranme" value={username} onChange={changeUsername} onKeyDown={handleKeyDown} autoFocus={true} autoComplete="false" placeholder="Email Address"/>
                </div>
                <div>
                    <input className="form-input" type="password" id="password" name="password" value={password} onChange={changePassword} onKeyDown={handleKeyDown} autoComplete="false" placeholder="Password"/>
                </div>
                <div>
                    <button className="form-submit-button" type="button" name="login" onClick={handleSubmit}>Login</button>
                    <button className="form-submit-button" type="button" name="switch" onClick={() => navigate("/signup")}>New User</button>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;