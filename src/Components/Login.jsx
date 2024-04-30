import React from 'react';
import '../App.css';
import { useLogin } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const { verifyLogin } = useLogin();
  
  const handleLogin = async () => {
    await verifyLogin("user");
    navigate("/");
  }  

  return (
        <div className="container">
        <h2>Sign In</h2>
        <form className="login-form" id="login-form">
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required/>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required/>
          </div>
          <button type="button" onClick={handleLogin}>Login</button>
        </form>

      </div>
    );
};

export default Login;
