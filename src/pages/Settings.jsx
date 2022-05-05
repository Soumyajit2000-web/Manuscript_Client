import React, { useEffect, useState } from 'react'
import AuthorDetails from '../components/AuthorDetails'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Loading from '../components/common/Loading';
import '../styles/settings.scss'
import { updateUser } from '../services/users';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
    },

    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
}));

function Settings(props) {
    const { accountDetails, setAccountDetails } = props;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const [aboutAuthor, setAboutAuthor] = useState("");
    const classes = useStyles();

    useEffect(() => {
        if (accountDetails) {
            setUsername(accountDetails.username);
            setEmail(accountDetails.email);
            setAboutAuthor(accountDetails.aboutAuthor)
        }
    }, [])

    const updateAccount = async () => {
        setIsLoading(true);
        const data = {
            userId: `${accountDetails._id}`,
            username: username,
            email: email,
            aboutAuthor: aboutAuthor,
        }
        try {
            const response = await updateUser(accountDetails._id, data);
            console.log(response);
            setAccountDetails(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    return (
        <>
            <div className="userProfie">
                <div className="updateProfile">
                    <div className="profilePic">
                        <Avatar alt="Name" src="" className={classes.large} />
                        <label for="addProfilePic">
                            <AddCircleRoundedIcon />
                        </label>
                        <input type="file" id="addProfilePic" style={{ display: "none" }} />
                    </div>

                    <div className="profileInfo">
                        <form className={classes.root} action="" noValidate autoComplete="off">
                            <TextField
                                required id="standard-required"
                                label="Name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <TextField
                                required id="standard-required"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                label="About Me"
                                value={aboutAuthor}
                                onChange={(e) => setAboutAuthor(e.target.value)}
                            />

                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button style={{ backgroundColor: "#00d18b" }} onClick={updateAccount}>Save Changes</Button>
                        </form>
                    </div>
                </div>
                <AuthorDetails />
                {
                    isLoading ? <Loading /> : null
                }
            </div>

        </>
    )
}

export default Settings

