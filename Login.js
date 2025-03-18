import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import NavbarComp from './Navbar';
import { loginurl } from '../database';
import './Login.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Updated import
import PasswordIcon from '@mui/icons-material/Password';

const loginApi = process.env.LOGIN_API || loginurl;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginApi, { username, password });
      const validUser = response.data;

      if (validUser.auth) {
        localStorage.setItem('login', true);
        const sessionTime = new Date().getTime() + 1 * 60 * 1000; // Session expires in 1 minute
        localStorage.setItem('token', validUser.jwtToken);
        localStorage.setItem('expiresIn', sessionTime.toString());
        navigate('/');
      } else {
        setError('Login failed! Check your username and password.');
      }
    } catch (error) {
      setError('Login failed! Check your username and password.');
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem('login');
    if (loginStatus) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <NavbarComp />
      <div className="login-container">
        <form className="login-form" onSubmit={login}>
          <h2>Login</h2>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
         
           <Avatar sx={{ bgcolor: pink[500], width: 24, height: 24, marginLeft: '8px' }}>
                            <AccountCircle fontSize="small" />
                        </Avatar>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Avatar sx={{ bgcolor: pink[500], width: 24, height: 24, marginLeft: '8px' }}>
                            <PasswordIcon fontSize="small" />
                        </Avatar>
                        </div>
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
          <p className="register-link">
            Didn't have an account? Please <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>

  );
};

export default Login;