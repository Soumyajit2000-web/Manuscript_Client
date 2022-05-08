import { Button, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import AuthorDetails from '../components/AuthorDetails'
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import '../styles/postPage.scss';
import { useParams } from 'react-router-dom';
import { getPostDetails } from '../services/posts';
import { getImage } from '../services/imagesReq';
import Loading from '../components/common/Loading';

function PostPage() {
    const { postId } = useParams();
    const [postData, setPostData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [postImgBuffer, setPostImgBuffer] = useState();
    const [postImgBase64, setPostImgBase64] = useState("")
    //get post data from parameters
    const handleGetPostData = async () => {
        setIsLoading(true)
        try {
            const response = await getPostDetails(postId);
            setPostData(response.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetPostData()
    }, [postId]);

    // get image buffer
    const getImageBuffer = async (id) => {
        try {
            const bufferResponse = await getImage(id);
            return bufferResponse.data.image.data.data;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(async () => {
        if (postData) {
            const imgBuffer = await getImageBuffer(postData.photo);
            setPostImgBuffer(imgBuffer);
        }
    }, [postData])

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
        if (postImgBuffer) {
            const picBase64 = convertBufferToBase64(postImgBuffer);
            setPostImgBase64(picBase64);
        }
    }, [postImgBuffer])

    return (
        <div className="postPageContainer">
            <AuthorDetails 
                userId={postData.userId}
            />
            <div className="postContent">
                <div className="postImage">
                    <img src={`data:image/png;base64,${postImgBase64}`} alt="" />
                </div>
                <div className="postTitle">
                    <Typography variant="h6"> {postData.title} </Typography>
                    <div className="titleIcons">
                        <Button style={{ borderRadius: "100px", minWidth: "45px", minHeight: "45px", display: "none" }}><EditRoundedIcon /></Button>
                        <Button style={{ borderRadius: "100px", minWidth: "45px", minHeight: "45px", display: "none" }}><DeleteIcon /></Button>
                    </div>
                </div>
                <div className="postDetails">
                    <Typography variant="h6" style={{ color: "rgba(0, 0, 0, 0.54)", fontWeight: "400" }}> {postData.username} </Typography>
                </div>
                <div className="postBody">
                    <Typography variant="body2" style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                        {postData.desc}
                    </Typography>
                </div>
            </div>
            {
                isLoading ? <Loading /> : null
            }
        </div>
    )
}

export default PostPage
