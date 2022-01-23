import React from 'react';
import '../styles/Cta.scss'
import Typography from '@material-ui/core/Typography';
import ctaImg from '../images/notebook.svg';
import { Button } from '@material-ui/core';

function Cta() {
    return (
        <div className="ctaContainer">
            <div className="ctaLeft">
                <Typography variant="h4" gutterBottom style={{color: "#00d18b", fontWeight: "bolder"}}>
                    LET THE WORLD READ WHAT YOU TYPE...!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    The all in one platform to read and write any kind of content like articles, news, blogs, papers, stories, novels, poems and many more. Your reach is literally at your finger tips.
                </Typography>
                <br></br>
                <Button variant="contained" color="secondary">
                    Start Writing
                </Button>
            </div>
            <div className="ctaRight">
                <img src={ctaImg} alt="" />
            </div>
        </div>
    )
}

export default Cta
