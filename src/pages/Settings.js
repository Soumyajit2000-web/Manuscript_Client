import React from 'react'
import '../styles/settings.css';
import AuthorDetails from '../components/AuthorDetails'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"

    },

    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
}));

function Settings() {
    const classes = useStyles();

    return (
        <>
            <div classname="userSettings">
                <div className="updateProfile">
                    <div className="profilePic">
                        <Avatar alt="Name" src="" className={classes.large} />
                        <label for="addProfilePic">
                            <AddCircleRoundedIcon />
                        </label>
                        <input type="file" id="addProfilePic" style={{ display: "none" }} />
                    </div>

                    <div className="profileInfo">
                        <form className={classes.root} action="">
                            <TextField
                                required id="standard-required"
                                label="Name"
                                defaultValue=""
                            />

                            <TextField
                                required id="standard-required"
                                label="Email"
                                defaultValue=""
                            />

                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </form>
                    </div>
                </div>
                <AuthorDetails />
            </div>
        </>
    )
}

export default Settings

