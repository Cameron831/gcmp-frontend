import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';

const Header = () => {
    const loginContext = useLogin();
    const navigate = useNavigate();

    if (!loginContext) {
        console.error('LoginContext not found');
        return <p>Error: Context not available</p>;
    }

    const { loggedIn } = loginContext;

    return(
        <header style={headerStyle}>
            <div onClick={() => {navigate("/")}}>
                Logo
            </div> 
            <div onClick={() => {navigate("/book")}}>
                Book
            </div>
            {!loggedIn && 
                <div onClick={() => {navigate("/login")}}>
                    Login
                </div>
            }
            {loggedIn && 
                <div onClick={() => {navigate("/account")}}>
                    Account
                </div>
            }
            <h1 onClick={() => {navigate("/")}}>
                Golf Course Management Platform
            </h1>
        </header>
    )
}

const headerStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    fontSize: '24px'
};

export default Header;
