import React from 'react';
import Signup from '../Components/Signup';
import Login from '../Components/Login';

const Home = () => {
    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <div className='container'>
            {isLogin && <Login/>}
            {!isLogin && <Signup/>}
            
            <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create Account" : "Already Have an Account?"}</button>
        </div>
    );
}

export default Home;
