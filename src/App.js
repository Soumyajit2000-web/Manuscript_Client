import React from 'react';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import './App.css';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import PostPage from './pages/PostPage';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Homepage/>
      <PostPage/>
      <Write/>
      <Settings/>
      <Login/>
      <Register/>
    </div>
  );
}

export default App;
 