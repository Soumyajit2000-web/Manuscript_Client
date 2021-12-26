import React from 'react';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import './App.css';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import PostPage from './pages/PostPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';


function App() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div className="App">
      {/* configuring routes  */}
      <Router>
        <Navbar isLogin={isLogin} setIsLogin={setIsLogin}/>
        <Routes>
          <Route exact path="/" element={<Homepage isLogin={isLogin}/>}/>
          <Route path="/register" element={<Register setIsLogin={setIsLogin}/>}/>
          <Route path="/login" element={<Login setIsLogin={setIsLogin}/>} />
          <Route path="/write" element={<Write/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/post/:postId" element={<PostPage/>} />
        
        </Routes>

      </Router>

    </div>
  );
}

export default App;
