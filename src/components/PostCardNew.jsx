import React, { useState, useEffect } from 'react';
import ShareIcon from '@material-ui/icons/Share';
import Avatar from '@material-ui/core/Avatar';
import '../styles/postCard.scss';
import { getImage } from '../services/imagesReq';
import { getUserDetails } from '../services/users';
import parse from 'html-react-parser';


function PostCard(props) {
    const { title, desc, photo, username, userId, date } = props;
    const [postPicBuffer, setPostPicBuffer] = useState();
    const [profilePicBuffer, setProfilePicBuffer] = useState();
    const [postBase64String, setPostBase64String] = useState();
    const [profileBase64String, setProfileBase64String] = useState();
    const d = new Date(date.slice(0,10));
    const [strippedDesc, setStrippedDesc] = useState("");

    const getImageBuffer = async (id) => {
        try {
            const bufferResponse = await getImage(id);
            return bufferResponse.data.image.data.data;
        } catch (err) {
            console.log(err);
        }
    }

    const getProfileInfo = async () => {
        try {
            const response = await getUserDetails(userId);
            const profileBuffer = await getImageBuffer(response.data.profilepic)
            setProfilePicBuffer(profileBuffer);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProfileInfo();
    }, [userId]);



    const handlePostImage = async () => {
        try {
            const postImageBuffer = await getImageBuffer(photo);
            setPostPicBuffer(postImageBuffer);
        }catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handlePostImage();
    }, [photo])

    //converting image to base64

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
        if(postPicBuffer){
          const pic64 =  convertBufferToBase64(postPicBuffer);
          setPostBase64String(pic64);
        }
    }, [postPicBuffer]);

    useEffect(()=>{
        if(profilePicBuffer){
            const pic64 = convertBufferToBase64(profilePicBuffer);
            setProfileBase64String(pic64);
        }
    },[profilePicBuffer])

    //Trim String
    const trimTitle = (str) => {
        let length = 70;
        if(str!==null){
            return str.length > length ? str.substring(0, length - 3) + "..." : str;
        }
    }

    const trimDesc = (str) => {
        let length = 100;
        if(str!==null){
            return str.length > length ? str.substring(0, length - 3) + "..." : str;
        }
    }

    //convert html string to cleanText
    const convertHtmlToString = (htmlStr) => {
        let cleanText = htmlStr.replace(/<\/?[^>]+(>|$)/g, "");
        let trimText = trimDesc(cleanText);
        return trimText;
    }

    return (
        <div>
            <main className="card">

                <div className="card_background">
                    <img src={`data:image/png;base64,${postBase64String}`} className='card-img' alt="Drawers" />
                </div>

                <div className="content">

                    <h3 className="content_intro">
                        {trimTitle(title)}
                    </h3>

                    <p className="content_paragraph">
                        {convertHtmlToString(desc)}
                    </p>

                    <div className="avatar">
                        <span className='avatar_av-img'><Avatar src={`data:image/png;base64,${profileBase64String}`} alt={username} /></span>
                        <div className="avatar_info">

                            <div className="_info_name">{username}</div>
                            <div className="_info_date">{d.toDateString().slice(4)}</div>

                        </div>

                        <span className="avatar_share-img"><ShareIcon /></span>

                    </div>

                </div>

            </main>
        </div>

    );
}

export default PostCard;
