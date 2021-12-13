import React from 'react'
import '../styles/Navbar.css'
import logo from '../images/onlinelogomaker-051321-1920-2225.png'

function Navbar() {
    return (
      <div className="nav">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
      </div>
    )
}

export default Navbar
