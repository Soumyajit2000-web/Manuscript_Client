import React from 'react';
import '../styles/Cta.scss'
import Typography from '@material-ui/core/Typography';
import ctaImg2 from '../images/P3-removebg-preview.png'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Cta() {
    return (
        <div className="ctaContainer">
            <div className="ctaLeft">
                <Typography variant="h4" gutterBottom style={{ color: "rgb(4 100 68)", fontWeight: "bolder" }}>
                    LET THE WORLD READ WHAT YOU TYPE...!
                </Typography>
                <Typography variant="body1" className="cta-body" gutterBottom>
                    The all in one platform to read and write any kind of content like articles, news, blogs, papers, stories, novels, poems and many more. Your reach is literally at your finger tips.
                </Typography>
                <br></br>
                <Link to="/register" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="secondary">
                        Start Writing
                    </Button>
                </Link>

            </div>
            <div className="ctaRight">
                <img src={ctaImg2} alt="" />
            </div>
        </div>
    )
}

export default Cta
