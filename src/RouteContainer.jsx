import React from 'react'
import Homepage from './pages/Homepage';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import PostPage from './pages/PostPage';
import { Routes, Route } from 'react-router-dom'

const RouteContainer = (props) => {
    const { isLogin, setIsLogin } = props;
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Homepage isLogin={isLogin} />} />
                <Route path="/register" element={<Register setIsLogin={setIsLogin} />} />
                <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
                <Route path="/write" element={<Write />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/post/:postId" element={<PostPage />} />
            </Routes>
        </>
    )
}

export default RouteContainer