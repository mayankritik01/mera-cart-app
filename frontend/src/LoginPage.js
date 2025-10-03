import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';
import AuthContext from './context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const { userInfo, login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('/api/users/login', { email, password }, config);
      login(data);
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <p>Get access to your Orders, Wishlist and Recommendations</p>
        
        {error && <p className="message error">{error}</p>}

        <form className="auth-form" onSubmit={submitHandler}>
            <input 
                type="email" 
                placeholder="Enter Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
            />
            <input 
                type="password" 
                placeholder="Enter Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
            />
            <button type="submit" className="auth-btn">
                Login
            </button>
        </form>
        <p className="auth-switch">
            New to Mera Cart? <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;