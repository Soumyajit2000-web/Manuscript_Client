import React from 'react'
import PostCard from '../components/PostCard'
import Cta from '../components/Cta';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Typography } from '@material-ui/core';
import '../styles/homepage.scss'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

function Homepage(props) {

    const classes = useStyles();

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <>  
            {

                props.isLogin ? null :  <Cta />

            }
            <div className="postContainer">
                <div className="chips">
                    <Typography varient="h6" style={{ fontWeight: "bolder", marginBottom: "1rem" }}>
                        DISCOVER MORE OF WHAT MATTERS TO YOU
                    </Typography>
                    <div className={classes.root}>
                        <Chip label="Clickable Link" component="a" onClick={handleClick} clickable />
                        <Chip label="Clickable Link" component="a" onClick={handleClick} clickable />
                        <Chip label="Clickable Link" component="a" onClick={handleClick} clickable />
                        <Chip label="Clickable Link" component="a" onClick={handleClick} clickable />
                        <Chip label="Clickable Link" component="a" onClick={handleClick} clickable />

                    </div>
                </div>

                <div className="posts">

                    <Typography varient="h5" style={{ textDecoration: "underline", fontSize: "1.5rem", fontWeight: "bolder" }}>
                        TRENDING
                    </Typography>

                    <div className="postWrapper">
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                    </div>

                </div>

            </div>


        </>
    )
}

export default Homepage
