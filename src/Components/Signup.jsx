import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate();
    
    const handleSignUp = async (e) => {
      e.preventDefault();
      const customer = {
        "username": username,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }

      try {
        const response = await axios.post(`http://senior-project-421916.appspot.com/customer`, customer);
        if(response.status === 201) {
            navigate("/login");
        }
      } catch (error) {
        
      }
    };
  
    return (
      <div className="container">
        <h2>Sign In</h2>
        <form className="login-form" onSubmit={handleSignUp}>
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
            <label htmlFor="firstname">First Name:</label>
            <input 
              type="text" 
              id="firstname" 
              name="firstname"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input 
              type="text" 
              id="lastname" 
              name="lastname"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input 
              type="text" 
              id="email" 
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
      );
  };

export default Signup;
