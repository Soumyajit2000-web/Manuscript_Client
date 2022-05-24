import React, { useEffect, useState } from 'react'
import AuthorDetails from '../components/AuthorDetails'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
// import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Loading from '../components/common/Loading';
import '../styles/settings.scss'
import { updateUser } from '../services/users';
import { uploadImage, deleteImage } from '../services/imagesReq';

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
    const {
        accountDetails,
        handleGetAccountDetails,
        setAccountDetails,
        profilePicBuffer,
        setProfilePicBuffer,
        onToastClose,
        onToastOpen
    } = props;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const [aboutAuthor, setAboutAuthor] = useState("");
    const [profilePic, setProfilePic] = useState();
    const [profilePicId, setProfilePicId] = useState("");
    const [base64String, setBase64String] = useState("");
    const classes = useStyles();

    useEffect(() => {
        if (accountDetails) {
            setUsername(accountDetails.username);
            setEmail(accountDetails.email);
            setAboutAuthor(accountDetails.aboutAuthor);
            setProfilePicId(accountDetails.profilepic);
        }
    }, [])

    const updateAccount = async () => {
        setIsLoading(true);
        const data = {
            userId: `${accountDetails._id}`,
            username: username,
            email: email,
            aboutAuthor: aboutAuthor,
            profilepic: profilePicId,
            isAdmin: false,
        }
        try {
            const response = await updateUser(accountDetails._id, data);
            console.log(response);
            setAccountDetails(response.data);
            // await handleGetAccountDetails();
            setIsLoading(false);
            onToastOpen({
                severity: 'success',
                message: 'Account details updated successfully'
            })
            setTimeout(() => {
                onToastClose();
            }, 6000)
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            onToastOpen({
                severity: 'error',
                message: 'Something went wrong!'
            })
            setTimeout(() => {
                onToastClose();
            }, 6000)
        }
    }

    const handleProfilePic = async () => {
        setIsLoading(true);
        let formData = new FormData();
        formData.append("name", "ms-test");
        formData.append("file", profilePic);
        try {
            let response = await uploadImage(formData);
            console.log(response.data);
            setProfilePicId(response.data._id);
            setProfilePicBuffer(response.data.image.data.data);
            setIsLoading(false);
            // await updateAccount();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (profilePic) {
            handleProfilePic();
        }
    }, [profilePic])

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

    const handleImgDelete = async () => {
        try {
            let resp = await deleteImage(profilePicId)
            setProfilePicBuffer("");
            setProfilePicId("");
            setBase64String("");
            await updateAccount();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="userProfie">
                <div className="updateProfile">
                    <div className="profilePic">
                        <Avatar alt="Name" src={`data:image/png;base64,${base64String}`} className={classes.large} />
                        {
                            base64String ? (
                                <div className='removeProfilePic' onClick={handleImgDelete} style={{cursor: "pointer"}}>
                                    <RemoveCircleRoundedIcon />
                                </div>
                            ) : (
                                <label for="addProfilePic">
                                    <AddCircleRoundedIcon />
                                </label>
                            )
                        }

                        <input type="file" id="addProfilePic" onChange={(e) => setProfilePic(e.target.files[0])} style={{ display: "none" }} />
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
                <AuthorDetails
                    userId={accountDetails._id}
                />
                {
                    isLoading ? <Loading /> : null
                }
            </div>

        </>
    )
}

export default Settings

