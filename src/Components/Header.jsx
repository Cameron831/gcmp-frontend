import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';

const Header = () => {
    const navigate = useNavigate();

    const { loggedIn } = useLogin();

    return(
        <header style={headerStyle}>
            <div onClick={() => {navigate("/")}}>
                Logo placeholder
            </div> 
            <div onClick={() => {navigate("/book")}}>
                Book Now
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
            <h1>Golf Course Management Platform</h1>
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
