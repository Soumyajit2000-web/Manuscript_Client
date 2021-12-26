import React from 'react'
import '../styles/login.css'
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Login(props) {
    return (
        <div className="loginContainer">
            <Typography variant="h3" gutterBottom>
                Login
            </Typography>
            <form className="loginForm" action="" noValidate autoComplete="off">
                {/* <label>Email</label> */}
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
                <Button onClick={()=>props.setIsLogin(true)} variant="contained" color="primary">Login</Button>
            </form>

            <Typography variant="body2"> Didn't have an account ? </Typography>
            <Link to="/register" style={{textDecoration: "none"}}>
                <Button variant="contained" style={{color: "white", backgroundColor: "#00d18b"}}>Sign Up</Button>
            </Link>
        </div>
    )
}

export default Login
