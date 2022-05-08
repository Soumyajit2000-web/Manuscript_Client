import React, { useState, useEffect } from 'react';
import '../styles/Navbar.scss';
import logo from '../images/onlinelogomaker-051321-1920-2225.png';
import { Button, Avatar } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import { Link, useNavigate } from 'react-router-dom';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

function Navbar(props) {
  const { isLogin, setIsLogin, profilePicBuffer, accountDetails } = props;
  const [base64String, setBase64String] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("Account-Id");
    navigate('/')
  }

  const convertBufferToBase64 = () => {
    let binary = '';
    let bytes = new Uint8Array(profilePicBuffer);
    let len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = window.btoa(binary);
    setBase64String(base64);
  }

  useEffect(() => {
    if (profilePicBuffer) {
      convertBufferToBase64();
    }
  }, [profilePicBuffer])

  if (isLogin) {
    return (
      <>
        <div className="nav">
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          </Link>

          <div className="list">
            <ul>
              <li><Link to="/" style={{ textDecoration: "none" }}>
                <Button>Home</Button>
              </Link>
              </li>
              <li><Button>About Us</Button></li>
              <li>
                <Link to="/write" style={{ textDecoration: "none" }}>
                  <Button>Write</Button>
                </Link>
              </li>

            </ul>
          </div>
          <div className="user">
            <ul>
              <li>
                <Button
                  style={{ borderRadius: "100px", minWidth: "45px", minHeight: "45px" }}>
                  {
                    <Brightness4RoundedIcon />
                  }
                </Button>
              </li>

              <li>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button onClick={handleLogout}>Log Out</Button>
                </Link>
              </li>

              <li>
                <Link to="/settings" style={{textDecoration: "none" }}>
                  <Button>
                    <Avatar alt={accountDetails.username} src={`data:image/png;base64,${base64String}`} />
                  </Button>
                </Link>

              </li>
            </ul>
          </div>
        </div>
        <div className="bottomNav">
          <ul>
            <li>
              <Link to="/">
                <Button
                  style={{ borderRadius: "100px", minWidth: "45px", minHeight: "45px" }}>
                  {
                    <HomeRoundedIcon />
                  }
                </Button>
              </Link>

            </li>

            <li>
              <Link to="/write">
                <Button
                  style={{ borderRadius: "100px", minWidth: "45px", minHeight: "45px" }}>
                  {
                    <CreateRoundedIcon />
                  }
                </Button>
              </Link>

            </li>

            <li>
              <Button
                style={{ borderRadius: "100px", minWidth: "45px", minHeight: "45px" }}>
                {
                  <InfoRoundedIcon />
                }
              </Button>
            </li>

            <li>
              <Link to="/">
                <Button onClick={handleLogout}>
                  <ExitToAppOutlinedIcon />
                </Button>
              </Link>
            </li>

            <li>
              <Button
                style={{ borderRadius: "100px", minWidth: "45px", minHeight: "45px" }}>
                {
                  <Brightness4RoundedIcon />
                }
              </Button>
            </li>
          </ul>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="nav">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>

        <div className="list">
          <ul>
            <li><Link to="/" style={{ textDecoration: "none" }}>
              <Button>Home</Button>
            </Link>
            </li>
            <li><Button>About Us</Button></li>
          </ul>
        </div>
        <div className="user">
          <ul>
            <li><Button style={{ borderRadius: "100px", minWidth: "45px", minHeight: "45px" }}>{<Brightness4RoundedIcon />}</Button></li>
            <li>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button>Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary">Sign up</Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottomNav">
        <ul>
          <li>
            <Button
              style={{ borderRadius: "100px", minWidth: "45px", minHeight: "45px" }}>
              {
                <HomeRoundedIcon />
              }
            </Button>
          </li>

          <li>
            <Button
              style={{ borderRadius: "100px", minWidth: "45px", minHeight: "45px" }}>
              {
                <InfoRoundedIcon />
              }
            </Button>
          </li>

          <li>
            <Button
              style={{ borderRadius: "100px", minWidth: "45px", minHeight: "45px" }}>
              {
                <Brightness4RoundedIcon />
              }
            </Button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
