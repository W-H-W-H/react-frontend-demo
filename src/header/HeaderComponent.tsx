import { FC, ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { Role } from "../security/Roles";

const HeaderComponent: FC = (): ReactElement => { 
    
    const authContext = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        authContext?.logout();
        navigate("/home");
    }

    return (
        <header className="header">
                <ul className="flex">
                    <li className="header-link"><Link to="/">Home</Link></li>
                    { authContext?.userDetails?.roles.includes(Role.USER) && <li className="header-link"><Link to="/books" >Collections of Books</Link></li>}
                    { authContext?.userDetails?.roles.includes(Role.USER) &&  <li className="header-link"><Link to="/bookmarks" >My Favourite Books</Link></li>}
                    { authContext?.userDetails?.roles.includes(Role.USER) &&  <li className="header-link"><Link to="/users">My Info</Link></li>}
                </ul>
                <ul className="flex">
                    { authContext?.userDetails === null &&  <li className="header-link"><Link to="/login">Login</Link></li> }
                    { authContext?.userDetails === null &&  <li className="header-link"><Link to="/signup">Sign-up</Link></li> }
                    { authContext?.userDetails?.roles.includes(Role.USER) &&   <li className="header-link"><button onClick={handleLogout}>Logout</button></li>}
                </ul>
        </header>
    );
};

  
export default HeaderComponent;