import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function AuthForm() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // LOGIN FUNCTION
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/users/login", {
                email,
                password
            });

            console.log(res.data);
            alert("Login successful!");
            navigate("/dashboard");

        } catch (err) {
            alert("Login failed!");
            console.log(err);
        }
    };

    // SIGNUP FUNCTION
    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/users/register", {
                email,
                password
            });

            console.log(res.data);
            alert("Signup successful!");
            setIsLogin(true);

        } catch (err) {
            alert("Signup failed!");
            console.log(err);
        }
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <div className='form-toggle'>
                    <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Signup</button>
                </div>

                {isLogin ? (
                    <div className='form'>
                        <h2>Login Form</h2>
                        <input 
                          type='email' 
                          placeholder='Email Address'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                          type='password'
                          placeholder='Enter Password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <a href='#'>Forgot Password</a>
                        <button onClick={handleLogin}>Login</button>
                        <p>Not a member? <a href='#' onClick={() => setIsLogin(false)}>Signup now</a></p>
                    </div>
                ) : (
                    <div className='form'>
                        <h2>Signup Form</h2>
                        <input 
                          type='email'
                          placeholder='Email Address'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                          type='password'
                          placeholder='Enter Password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <input 
                          type='password'
                          placeholder='Confirm Password'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button onClick={handleSignup}>Signup</button>
                        <p>Already a member? <a href='#' onClick={() => setIsLogin(true)}>Login now</a></p>
                    </div>
                )}
            </div>
        </div>
    );
}
