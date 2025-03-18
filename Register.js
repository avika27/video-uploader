import axios from "axios";
import React, { useState } from "react";
import NavbarComp from "./Navbar";
import './Register.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import PasswordIcon from '@mui/icons-material/Password';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Updated import
import EmailIcon from '@mui/icons-material/Email';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        mobilenumber: '',
        gender: 'female', // Default gender
    });

    const [message, setMessage] = useState(null);

    const registerApi = 'http://localhost:5000/register';

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!formData.username || !formData.password || !formData.email || !formData.mobilenumber) {
            setMessage("All fields are required.");
            return;
        }

        try {
            const response = await axios.post(registerApi, formData);
            if (response.data.error) {
                setMessage(response.data.error);
            } else {
                setMessage(response.data.message);
            }
            console.log(response.data);
        } catch (error) {
            setMessage("Error registering the user.");
            console.error("Error registering the user", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <NavbarComp />
            <div className="register-container">
                <h1>Register</h1>
                <form className="register-form" onSubmit={handleRegister}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <TextField 
                            label="Username" 
                            name="username" 
                            value={formData.username}
                            onChange={handleChange} 
                            fullWidth
                            margin="normal"
                        />
                        <Avatar sx={{ bgcolor: pink[500], width: 24, height: 24, marginLeft: '8px' }}>
                            <AccountCircle fontSize="small" />
                        </Avatar>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <TextField 
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Avatar sx={{ bgcolor: pink[500], width: 24, height: 24, marginLeft: '8px' }}>
                            <PasswordIcon fontSize="small" />
                        </Avatar>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <TextField 
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Avatar sx={{ bgcolor: pink[500], width: 24, height: 24, marginLeft: '8px' }}>
        <EmailIcon fontSize="small" />
    </Avatar>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <TextField 
                            label="Mobile Number"
                            name="mobilenumber"
                            value={formData.mobilenumber}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Avatar sx={{ bgcolor: green[500], width: 24, height: 24, marginLeft: '8px' }}>
                            <PhoneIcon fontSize="small" />
                        </Avatar>
                    </div>
                    
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <Avatar sx={{ bgcolor: pink[500], width: 24, height: 24, marginLeft: '8px' }}>
                                <FemaleIcon fontSize="small" />
                            </Avatar>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <Avatar sx={{ bgcolor: green[500], width: 24, height: 24, marginLeft: '8px' }}>
                                <MaleIcon fontSize="small" />
                            </Avatar>
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    
                    <Button type="submit" variant="contained" color="primary">Register</Button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Register;
