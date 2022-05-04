import React, { useState, useEffect } from 'react'
import Homepage from './pages/Homepage';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import PostPage from './pages/PostPage';
import { Routes, Route } from 'react-router-dom'
import Toast from './components/common/Toast';
import Navbar from './components/Navbar';
import { getUserDetails } from './services/users';

const RouteContainer = (props) => {
    const { isLogin, setIsLogin } = props;
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastSeverity, setToastSeverity] = useState("");
    const [toastMessage, setToastMesssage] = useState("");
    const [accountDetails, setAccountDetails] = useState();
    // functions to handle toasts
    const onToastOpen = (toastProps) => {
        const { severity, message } = toastProps;
        setToastSeverity(severity);
        setToastMesssage(message);
        setIsToastOpen(true)
    }

    const onToastClose = () => {
        setToastMesssage("");
        setToastSeverity("");
        setIsToastOpen(false);
    }

    //Fetch account details
    const handleGetAccountDetails = async () => {
        try {
            let response = await getUserDetails(localStorage.getItem("Account-Id"));
            console.log(response.data);
            setAccountDetails(response.data);
        } catch (error) {
            console.log(error);
            onToastOpen({
                severity: "error",
                message: "Something went wrong!!!"
            })
            setTimeout(() => {
                onToastClose();
            }, 5000)
        }
    }

    useEffect(() => {
        if (isLogin === true) {
            handleGetAccountDetails();
        }
    }, [isLogin])

    useEffect(()=>{
        if(localStorage.getItem("Account-Id")){
            setIsLogin(true)
        }
    }, [])

    return (
        <>
            <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
            <Toast
                isToastOpen={isToastOpen}
                toastSeverity={toastSeverity}
                toastMessage={toastMessage}
                setIsToastOpen={setIsToastOpen}
            />

            <Routes>
                <Route exact path="/" element={<Homepage isLogin={isLogin} />} />
                <Route path="/register" element={
                    <Register
                        onToastOpen={onToastOpen}
                        onToastClose={onToastClose}
                    />
                } />
                <Route path="/login" element={
                    <Login
                        onToastOpen={onToastOpen}
                        onToastClose={onToastClose}
                        setIsLogin={setIsLogin}
                    />
                } />
                <Route path="/write" element={<Write />} />
                <Route path="/settings" element={<Settings accountDetails={accountDetails} />} />
                <Route path="/post/:postId" element={<PostPage />} />
            </Routes>
        </>
    )
}

export default RouteContainer