import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UnauthorisedPageComponent : FC = () => {
    
    const navigate = useNavigate();

    const [count, setCount] = useState<number>(5);
    setInterval( () => setCount(count - 1), 1000);
    
    useEffect( () => {
        const timer = setTimeout(() => navigate("/home"), count * 1000);
        return () => clearTimeout(timer);
    }, [count, navigate]);
    

    return (
        <div className="message-container-layer1">
            <div className="message-container-layer2">
                <h1 className="message-container-title">Unauthorised</h1>
                <p className="message-cotainer-description">You are not allowed to access this page.</p>
                <p className="message-cotainer-sub-description">Back to Home Page in {count} seconds</p>
            </div>
        </div>
    );
}

export default UnauthorisedPageComponent;