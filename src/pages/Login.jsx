import React, { useState } from 'react'
import '../styles/login.scss'
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import Loading from '../components/common/Loading';

function Login(props) {
    const { onToastOpen, onToastClose, setIsLogin } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        const data = {
            username: username,
            password: password
        }

        try{
            let response = await loginUser(data);
            setIsLoading(false);
            // console.log(response.data._id);
            localStorage.setItem("Account-Id", `${response.data._id}`);
            setIsLogin(true)
            navigate("/")
        }catch(err){
            console.log(err)
            setIsLoading(false);
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
        <div className="loginContainer">
            <Typography variant="h3" gutterBottom>
                Login
            </Typography>
            <form className="loginForm" action="" noValidate autoComplete="off">
                <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />

                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
            </form>

            <Typography variant="body2"> Didn't have an account ? </Typography>
            <Link to="/register" style={{textDecoration: "none"}}>
                <Button variant="contained" style={{color: "white", backgroundColor: "#00d18b"}}>Sign Up</Button>
            </Link>
            {
                isLoading ? <Loading /> : null 
            }
        </div>
    )
}

export default Login
