import React from 'react';
import '../App.css';

const Signup = () => {
    return (
        <div className="container">
            <h2>Create Account</h2>
            <div className=''>

            </div>
            <form className="signup-form" id="signup-form">
                <div className="form-group">
                    <input type="text" id="firstname" name="firstname" placeholder="First Name" required />
                    <input type="text" id="lastname" name="lastname" placeholder="Last Name" required />
                    <input type="email" id="email" name="email" placeholder="Email" required />
                </div>
                <button type="submit" className='button'>Sign Up</button>
            </form> 
        </div>
    );
};

export default Signup;
