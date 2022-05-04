import React, { useState } from 'react'
import Homepage from './pages/Homepage';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import PostPage from './pages/PostPage';
import { Routes, Route } from 'react-router-dom'
import Toast from './components/common/Toast';
import Navbar from './components/Navbar';

const RouteContainer = (props) => {
    const { isLogin, setIsLogin } = props;
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastSeverity, setToastSeverity] = useState("");
    const [toastMessage, setToastMesssage] = useState("");

    // functions to handle toasts
    const onToastOpen = (toastProps) => {
        const {severity, message} = toastProps;
        setToastSeverity(severity);
        setToastMesssage(message);
        setIsToastOpen(true)
    }

    const onToastClose = () => {
        setToastMesssage("");
        setToastSeverity("");
        setIsToastOpen(false);
    }



    return (
        <>
            <Navbar isLogin={isLogin} setIsLogin={setIsLogin}/>
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
                    />
                } />
                <Route path="/write" element={<Write />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/post/:postId" element={<PostPage />} />
            </Routes>
        </>
    )
}

export default RouteContainer