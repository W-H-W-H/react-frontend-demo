import { FC, ReactElement, useState } from "react";
import { register } from "../api/Authentication";

const SignupComponent : FC = () : ReactElement => {

    type InputEvent = React.ChangeEvent<HTMLInputElement>;

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
            (repsonse) => {

            }
        )
        .catch(
            (error) => {

            }
        );
    }
    

    return (
        <div className="form-container">
            <form className="form">
                <h1 className="form-title">Register Your Account</h1>
                <div>
                    <input className="form-input" type="email" id="username" name="useranme" value={username} onChange={changeUsername} autoComplete="false" placeholder="Email"/>
                </div>
                <div>
                    <input className="form-input" type="password" id="password" name="password" value={password} onChange={changePassword} autoComplete="false" placeholder="Password"/>
                </div>
                <div>
                    <input className="form-input" type="displayName" id="displayName" name="displayName" value={displayName} onChange={changeDisplayName} autoComplete="false" placeholder="Your Name"/>
                </div>
                <div>
                    <button className="form-submit-button" type="button" name="login" onClick={handleSubmit}>Signup</button>
                </div>
            </form>
        </div>
    );
}

export default SignupComponent;