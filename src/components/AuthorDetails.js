import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import { Button, Typography } from '@material-ui/core';
import '../styles/authorDetail.css';

const useStyles = makeStyles((theme) => ({
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

function AuthorDetails() {

    const classes = useStyles();

    return (
        <div className="authorContainer">
            <Avatar className={classes.orange}>N</Avatar>
            <Typography variant="h5" gutterBottom>Name</Typography>
            <Button variant="contained" color="secondary">Follow</Button>
            <Typography variant="h6">About Author</Typography>
            <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
        </div>
    )
}

export default AuthorDetails
