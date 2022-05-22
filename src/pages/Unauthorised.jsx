import React from 'react';
import unauthorised from '../images/401 Error Unauthorized-pana.svg';
import '../styles/Unauthorised.scss';

function Unauthorised() {
  return (
    <div className="unauth-container">
        <div className="unauth-img">
            <img src={unauthorised} alt="401 img" />
        </div>
        <div className="unauth-title">
            401 UNAUTHORIZED
        </div>
        <div className="unauth-desc">
            Sorry, we are not able to recognize you! Please login to access this page. 
        </div>
    </div>
  )
}

export default Unauthorised