import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setAccount(JSON.parse(user));
            setLoggedIn(true);
        }
    }, []);

    const verifyLogin = async (user, pass) => {
        try {
            const credentials = {"username": user, "password": pass};
            const response = await axios.post('http://localhost:3001/customer/login', credentials);
            if (response.status === 200) {
                localStorage.setItem('userToken', response.data._id);
                localStorage.setItem('user', JSON.stringify(response.data));
                setLoggedIn(true);
                setAccount(response.data);
            } else {
                setLoggedIn(false);
                setAccount(null);
            }
        } catch (error) {
            console.log(error);
            setLoggedIn(false);
            setAccount(null);
        }
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        setLoggedIn(false);
        setAccount(null);
    };

    const value = {
        loggedIn,
        account,
        verifyLogin,
        logout,
    };

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export const useLogin = () => useContext(LoginContext);
