import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import '../styles/write.scss';
import { Button } from '@material-ui/core';
import Loading from '../components/common/Loading';
import { uploadImage } from '../services/imagesReq';
import { addPost } from '../services/posts';
import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import parse from 'html-react-parser';

function Write(props) {
    const { accountDetails } = props;
    const [title, setTitle] = useState("");
    const [postImg, setPostImg] = useState();
    const [postImageId, setPostImageId] = useState("");
    const [postImageBuffer, setPostImageBuffer] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [base64String, setBase64String] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const navigate = useNavigate();
    const [postDescNew, setPostDescNew] = useState(() => EditorState.createEmpty());
    const [postDescFinal, setPostDescFinal] = useState("");
    let editorState = EditorState.createEmpty();
    const onEditorStateChange = (editorState) => {
        setPostDescNew(editorState);
    }
    useEffect(() => {
        let raw = convertToRaw(postDescNew.getCurrentContent());
        let html = draftToHtml(raw);
        setPostDescFinal(html);
    }, [postDescNew])

    const handlePostArticle = async () => {
        setIsLoading(true);
        const data = {
            title: title,
            desc: postDescFinal,
            photo: postImageId,
            username: accountDetails.username,
            userId: accountDetails._id
        }
        try {
            let response = await addPost(data);
            console.log(response.data);
            setIsLoading(false);
            navigate('/');
        } catch (error) {
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
    }, [postImg]);

    //reading img buffer
    const convertBufferToBase64 = () => {
        let binary = '';
        let bytes = new Uint8Array(postImageBuffer);
        let len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const base64 = window.btoa(binary);
        setBase64String(base64);
    }

    useEffect(() => {
        if (postImageBuffer) {
            convertBufferToBase64();
        }
    }, [postImageBuffer])

    return (
        <div className="write">
            <div className="writeImg">
                <img src={base64String !== "" ? `data:image/png;base64,${base64String}` : ""} alt="" />
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
                <div className='write-desc-input'>
                    {
                        showPreview ? (
                            <div className="write-preview">
                                {parse(postDescFinal)}
                            </div>
                        ) : (
                            <Editor
                                editorState={postDescNew}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={onEditorStateChange}
                            />
                        )
                    }

                </div>
                <div className="write-btn-group">
                    <Button variant="contained" onClick={handlePostArticle} style={{ backgroundColor: "teal", color: "white" }}>
                        Publish
                    </Button>
                    <Button variant="contained" onClick={()=>setShowPreview(!showPreview)} style={{ backgroundColor: "#f50057", color: "white" }}>
                        { showPreview ? "Edit" : "Preview" }
                    </Button>
                </div>

            </form>
            {
                isLoading ? <Loading /> : null
            }
        </div>
    )
}

export default Write
