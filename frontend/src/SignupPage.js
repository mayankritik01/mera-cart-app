import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setMessage('Please fill all the fields');
            return;
        }

        try {
            setLoading(true);
            setMessage(null);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

                await axios.post(
                '/api/users/signup',
                { name, email, password },
                config
            );
            
            setLoading(false);
            setMessage('Registration Successful! Please log in.');
            setName('');
            setEmail('');
            setPassword('');

        } catch (error) {
            setLoading(false);
            setMessage(error.response && error.response.data.message ? error.response.data.message : 'An error occurred');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Looks like you're new here!</h2>
                <p>Sign up with your email to get started</p>
                
                {message && <p className={`message ${message.includes('Successful') ? 'success' : 'error'}`}>{message}</p>}
                {loading && <p>Loading...</p>}

                <form className="auth-form" onSubmit={submitHandler}>
                    <input 
                        type="text" 
                        placeholder="Enter Your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
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
                    <button type="submit" className="auth-btn" disabled={loading}>
                        Sign Up
                    </button>
                </form>
                <p className="auth-switch">
                    Existing User? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;