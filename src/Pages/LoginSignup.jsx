import React from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';

export default function LoginSignup() {
    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <div className='container'>
                {isLogin && <Login/>}
                {!isLogin && <Signup/>}
            
            <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create Account" : "Already Have an Account?"}</button>
        </div>
    );
}