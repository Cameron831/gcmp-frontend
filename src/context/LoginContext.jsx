import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const verifyLogin = (user) => {
        setLoggedIn(true)
    };

    const logout = () => {
        setLoggedIn(false)
    }

    const value = {
        loggedIn, 
        verifyLogin,
        logout,
    };

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export const useLogin = () => useContext(LoginContext);