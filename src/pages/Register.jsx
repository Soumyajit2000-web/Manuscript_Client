import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import '../styles/register.scss';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/auth';

function Register(props) {
    const { onToastOpen, onToastClose } = props;
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async () => {
        const data = {
            username: userName,
            email: email,
            password: password
        }

        try {
            const response = await registerUser(data);
            console.log(response);
            navigate('/login');
            onToastOpen({
                severity: "success",
                message: "Your registration was successful"
            })
            setTimeout(()=>{
                onToastClose();
            }, 5000)
        } catch (error) {
            console.log(error);
            onToastOpen({
                severity: "error",
                message: "Something went wrong!!!"
            })
            setTimeout(()=>{
                onToastClose();
            }, 5000)
        }

    }

    return (
        <div className="registerContainer">
            <Typography variant="h3" gutterBottom>
                Register
            </Typography>
            <form className="registerForm" action="" noValidate autoComplete="off">
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />

                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleRegister}>Sign Up</Button>
            </form>

            <Typography variant="body2"> Already have an account ? </Typography>

            <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="contained" style={{ color: "white", backgroundColor: "#00d18b" }}>Login</Button>
            </Link>

        </div>
    )
}

export default Register
