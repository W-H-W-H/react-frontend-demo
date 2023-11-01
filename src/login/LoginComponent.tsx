import { FC, ReactElement, useState } from "react";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginComponent : FC = () : ReactElement => {

    type InputEvent = React.ChangeEvent<HTMLInputElement>;

    const authContext = useAuth();

    const [username, setUsername] = useState<string>("waiting.13@gmail.com");

    const [password, setPassword] = useState<string>("dummypassword");

    const navigate = useNavigate();

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
    

    return (
        <div className="form-container">
            <form className="form">
                <h1 className="form-title">Please Login</h1>
                <div>
                    <input className="form-input" type="email" id="username" name="useranme" value={username} onChange={changeUsername} autoComplete="false" placeholder="Email Address"/>
                </div>
                <div>
                    <input className="form-input" type="password" id="password" name="password" value={password} onChange={changePassword} autoComplete="false" placeholder="Password"/>
                </div>
                <div>
                    <button className="form-submit-button" type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;