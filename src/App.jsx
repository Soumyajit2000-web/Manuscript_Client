import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from 'react';
import RouteContainer from './RouteContainer';


function App() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div className="App">
      <Router>
        <RouteContainer isLogin={isLogin} setIsLogin={setIsLogin}/>
      </Router>

    </div>
  );
}

export default App;
