import React from 'react';
import '../styles/Unauthorised.scss';
import error from '../images/404 Error-pana.svg';

function Error404() {
    return (
        <div className="unauth-container">
            <div className="unauth-img">
                <img src={error} alt="401 img" />
            </div>
            <div className="unauth-title">
                404 PAGE NOT FOUND!!!
            </div>
            <div className="unauth-desc">
                Sorry, the page you are trying to access is not available!
            </div>
        </div>
    )
}

export default Error404