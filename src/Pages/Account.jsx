import React from 'react';
import { useLogin } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { logout } = useLogin();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div>
            <div onClick={handleLogout}>
                Log Out
            </div>
        </div>
    );
}

export default Account;
