import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import '../styles/write.scss';
import { Button } from '@material-ui/core';
import Loading from '../components/common/Loading';
import { uploadImage } from '../services/imagesReq';
import { addPost } from '../services/posts'

function Write(props) {
    const { accountDetails } = props;
    const [title, setTitle] = useState("");
    const [postDesc, setPostDesc] = useState("");
    const [postImg, setPostImg] = useState();
    const [postImageId, setPostImageId] = useState("");
    const [postImageBuffer, setPostImageBuffer] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handlePostArticle = async () => {
        setIsLoading(true);
        const data = {
            title: title,
            desc: postDesc,
            photo: postImageId,
            username: accountDetails.username,
            userId: accountDetails._id
        }
        try {
            let response = await addPost(data);
            console.log(response.data);
            setIsLoading(false) 
        }catch(error){
            console.log(error);
            setIsLoading(false) 
        }

    }

    //postImg
    const handlePostPic = async () => {
        setIsLoading(true);
        let formData = new FormData();
        formData.append("name", "ms-test");
        formData.append("file", postImg);
        try {
            let response = await uploadImage(formData);
            console.log(response.data);
            setPostImageId(response.data._id);
            setPostImageBuffer(response.data.image.data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (postImg) {
            handlePostPic();
        }
    }, [postImg])

    return (
        <div className="write">
            <div className="writeImg">
                <img src="https://media.istockphoto.com/photos/freedom-chains-that-transform-into-birds-charge-concept-picture-id1322104312?b=1&k=20&m=1322104312&s=170667a&w=0&h=VQyPkFkMKmo0e4ixjhiOLjiRs_ZiyKR_4SAsagQQdkk=" alt="" />
            </div>
            <form className="writeForm">
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <AddIcon />
                    </label>
                    <input id="fileInput" type="file" onChange={(e) => setPostImg(e.target.files[0])} style={{ display: "none" }} />
                    <input
                        className="writeInput titleInput"
                        placeholder="Title"
                        type="text"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        className="writeInput writeText"
                        placeholder="Tell your story..."
                        type="text"
                        autoFocus={true}
                        onChange={(e) => setPostDesc(e.target.value)}
                    />
                </div>
                <Button variant="contained" onClick={handlePostArticle} style={{ backgroundColor: "teal", color: "white" }}>
                    Publish
                </Button>
            </form>
            {
                isLoading ? <Loading /> : null
            }
        </div>
    )
}

export default Write
