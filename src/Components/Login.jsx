import React, { useState } from 'react';
import '../App.css';
import { useLogin } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { verifyLogin } = useLogin();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    await verifyLogin(username, password);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    );
};

export default Login;
