import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HeaderComponent from './header/HeaderComponent';
import LoginComponent from './login/LoginComponent';
import BookListComponent from './book/BookListComponent';
import AuthProvider, { useAuth } from './security/AuthContext';
import HomeComponent from './home/HomeComponent';
import { ReactElement } from 'react';
import { Role } from './security/Role';
import UnauthorisedPageComponent from './error/UnauthorisedPageComponent';
import SignupComponent from './signup/SignUpComponent';
import BookmarkListComponent from './bookmark/BookmarkListComponent';
import UserInfoComponent from './user/UserInfoComponent';
import InvalidUrlPageComponent from './error/InvalidUrlPageComponent';

interface IProtectedRouteProps {
  children : ReactElement
  requiredRole: Role | null
}

function ProtectedRoute({children, requiredRole} : IProtectedRouteProps) : ReactElement | null{
  const authContext = useAuth();

  if(requiredRole === null && authContext?.userDetails === null){
    return children;
  }
  else if(requiredRole !== null && authContext?.userDetails?.roles.includes(requiredRole)){
      return children;
  }
  else{
    return (<Navigate to="/unauthorised" replace/>);
  }
  
}

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
            <HeaderComponent/>
            <Routes>
              <Route path="/login" element={<ProtectedRoute children={<LoginComponent/>} requiredRole={null}/>}/>
              <Route path="/" element={<HomeComponent/>}/> 
              <Route path="/home" element={<HomeComponent/>}/>
              <Route path="/books" element={<ProtectedRoute children={<BookListComponent/>} requiredRole={Role.USER}/>}/>
              <Route path="/unauthorised" element={<UnauthorisedPageComponent/>}/>
              <Route path="/signup" element={<ProtectedRoute children={<SignupComponent/>} requiredRole={null} />}/>
              <Route path="/bookmarks" element={<ProtectedRoute children={<BookmarkListComponent/>} requiredRole={Role.USER}/>}/>
              <Route path="/users" element={<ProtectedRoute children={<UserInfoComponent/>} requiredRole={Role.USER}/>}/>
              <Route path='*' element={<InvalidUrlPageComponent/>}/>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
