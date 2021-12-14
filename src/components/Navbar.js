import React from 'react'
import '../styles/Navbar.css'
import logo from '../images/onlinelogomaker-051321-1920-2225.png'
import { Button } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';

function Navbar() {
  return (
    <>
      <div className="nav">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="list">
          <ul>
            <li><Button>Home</Button></li>
            <li><Button>About Us</Button></li>
          </ul>
        </div>
        <div className="user">
          <ul>
            <li><Button style={{borderRadius: "100px", minWidth: "45px", minHeight: "45px"}}>{<Brightness4RoundedIcon/>}</Button></li>
            <li><Button>Login</Button></li>
            <li><Button variant="contained" color="secondary">Sign up</Button></li>
          </ul>
        </div>
      </div>
      <div className="bottomNav">
        <ul>
          <li><Button style={{borderRadius: "100px", minWidth: "45px", minHeight: "45px"}}>{<HomeRoundedIcon/>}</Button></li>
          <li><Button style={{borderRadius: "100px", minWidth: "45px", minHeight: "45px"}}>{<InfoRoundedIcon/>}</Button></li>
          <li><Button style={{borderRadius: "100px", minWidth: "45px", minHeight: "45px"}}>{<Brightness4RoundedIcon/>}</Button></li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
