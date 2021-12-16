import React from 'react';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import './App.css';
// import PostPage from './pages/PostPage';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Homepage/>
      {/* <PostPage/> */}
    </div>
  );
}

export default App;
 