import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';
import '../Styles/Header.css';

const Header = () => {
    const loginContext = useLogin();
    const navigate = useNavigate();

    if (!loginContext) {
        console.error('LoginContext not found');
        return <p>Error: Context not available</p>;
    }

    const { loggedIn } = loginContext;

    return (
        <header className="header">
            <div className="logo" onClick={() => { navigate("/") }}>
                Golf Course Managment Platform
            </div>
            <nav>
                <div onClick={() => { navigate("/") }}>Course Homepage</div>
                <div onClick={() => { navigate("/book") }}>Tee Times</div>
                {!loggedIn &&
                    <div onClick={() => { navigate("/login") }}>Log In</div>
                }
                {loggedIn &&
                    <div onClick={() => { navigate("/account") }}>Account</div>
                }
            </nav>
        </header>
    );
};

export default Header;