import React from 'react';
import '../App.css';

const Login = () => {
    return (
        <div class="container">
        <h2>Sign In</h2>
        <form className="login-form" id="login-form">
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required/>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required/>
          </div>
          <button type="submit">Login</button>
        </form>

      </div>
    );
};

export default Login;
