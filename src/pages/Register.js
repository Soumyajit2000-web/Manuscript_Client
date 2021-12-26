import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import '../styles/register.css';
import { Link } from 'react-router-dom';

function Register() {
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
                />

                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                />

                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
                <Button variant="contained" color="primary">Sign Up</Button>
            </form>

            <Typography variant="body2"> Already have an account ? </Typography>

            <Link to="/login" style={{textDecoration: "none"}}>
                <Button variant="contained" style={{color: "white", backgroundColor: "#00d18b"}}>Login</Button>
            </Link>
           
        </div>
    )
}

export default Register
