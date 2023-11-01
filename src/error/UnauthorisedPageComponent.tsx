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
        <div>
            <h1>
                You are not allowed to access this page.
            </h1>
            <h2>Back to Home Page in {count} seconds</h2>
        </div>
    );
}

export default UnauthorisedPageComponent;