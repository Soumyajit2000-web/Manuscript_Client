import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import { Button, Typography } from '@material-ui/core';
import { getUserDetails } from '../services/users';
import { getImage } from '../services/imagesReq';
import '../styles/authorDetail.scss';

const useStyles = makeStyles((theme) => ({
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

function AuthorDetails(props) {
    const classes = useStyles();
    const [userDetails, setUserDetails] = useState({});
    const [userImageBuffer, setUserImageBuffer] = useState([]);
    const [userImgBase64, setUserImgBase64] = useState("");
    const { userId } = props;

    const handleGetUserDetails = async () => {
        try {
            let response = await getUserDetails(userId);
            setUserDetails(response.data);
        }catch (err) {
            console.error(err)
        }
    }

    useEffect(()=>{
        handleGetUserDetails();
    }, [userId])

    // get user imgBuffer
    const getImageBuffer = async (id) => {
        try {
            const bufferResponse = await getImage(id);
            return bufferResponse.data.image.data.data;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(async () => {
        const imgBuffer = await getImageBuffer(userDetails.profilepic);
        setUserImageBuffer(imgBuffer);
    }, [userDetails]);

    const convertBufferToBase64 = (picBuffer) => {
        let binary = '';
        let bytes = new Uint8Array(picBuffer);
        let len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const base64 = window.btoa(binary);
        return base64;
    }

    useEffect(() => {
        if(userImageBuffer){
            let picBase64 = convertBufferToBase64(userImageBuffer);
            setUserImgBase64(picBase64);
        }
    }, [userImageBuffer])

    return (
        <div className="authorContainer">
            <Avatar size="large" alt={userDetails.username} src={`data:image/png;base64,${userImgBase64}`} className={classes.orange}></Avatar>
            <Typography variant="h5" gutterBottom>{userDetails.username}</Typography>
            <Button variant="contained" color="secondary" style={{display: 'none'}}>Follow</Button>
            <Typography variant="h6">About Author</Typography>
            <Typography variant="body2">
                {userDetails.aboutAuthor}
            </Typography>
        </div>
    )
}

export default AuthorDetails
