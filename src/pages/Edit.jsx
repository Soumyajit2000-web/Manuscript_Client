import React, { useState, useEffect } from 'react';
import '../styles/write.scss';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Loading from '../components/common/Loading';
import { uploadImage, getImage } from '../services/imagesReq';
import { addPost, updatePost, getPostDetails } from '../services/posts';
import { getAllCategories, addCategories } from '../services/categories';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import parse from 'html-react-parser';
import 'antd/dist/antd.css';
import { Select, Input } from 'antd';

const { Option } = Select;

function Edit(props) {
    const { accountDetails } = props;
    const { id } = useParams();
    const [postDetails, setPostDetails] = useState({});
    const [title, setTitle] = useState("");
    const [postImg, setPostImg] = useState();
    const [postImageId, setPostImageId] = useState("");
    const [postImageBuffer, setPostImageBuffer] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [base64String, setBase64String] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [allCatagories, setAllCatagories] = useState([]);
    const [selectedCatagory, setSelectedCatagory] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const navigate = useNavigate();
    const [postDescNew, setPostDescNew] = useState(() => EditorState.createEmpty());
    const [postDescFinal, setPostDescFinal] = useState("");

    //setting default post detail
    const handleGetPostData = async () => {
        try {
            let response = await getPostDetails(id);
            setPostDetails(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleGetPostData();
    }, []);

    useEffect(() => {
        if (postDetails) {
            setTitle(postDetails.title);
            setPostDescFinal(postDetails.desc);
            setPostImageId(postDetails.photo);
            setSelectedCatagory(postDetails.categories);
        }
    }, [postDetails]);

    //setting post Image
    const getImageBuffer = async (id) => {
        try {
            const bufferResponse = await getImage(id);
            return bufferResponse.data.image.data.data;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(async () => {
        if (postImageId) {
            const bufferResponse = await getImageBuffer(postImageId);
            setPostImageBuffer(bufferResponse);
        }
    }, [postImageId])

    //setting post description
    useEffect(() => {
        if (postDescFinal !== "") {
            const blocksFromHTML = convertFromHTML(postDescFinal);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap,
            );
            setPostDescNew(() => EditorState.createWithContent(state));
        }
    }, [postDescFinal])

    //editor logic
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
            userId: accountDetails._id,
            categories: selectedCatagory
        }
        try {
            let response = await updatePost(id, data);
            setIsLoading(false);
            navigate(`/post/${id}`);
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

    //categories api
    const handleGetAllCategories = async () => {
        try {
            let response = await getAllCategories();
            setAllCatagories(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        handleGetAllCategories();
    }, [])

    const handleAddNewCategory = async () => {
        if (newCategory !== "") {
            const data = {
                name: newCategory
            }
            try {
                let response = await addCategories(data);
                handleGetAllCategories();
            } catch (err) {
                console.log(err);
            }
        }

    }

    const handleSelectCategory = (value) => {
        setSelectedCatagory([value]);
    }

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
                    <input
                        id="fileInput"
                        type="file"
                        onChange={(e) => setPostImg(e.target.files[0])} style={{ display: "none" }}
                    />
                    <input
                        value={title}
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
                <div className="write-category">
                    <div className="selectCat">
                        <p className='selectCat-label'>Tag</p>
                        <Select
                            showSearch
                            value={selectedCatagory ? selectedCatagory[0] : ""}
                            placeholder="Select a category"
                            optionFilterProp="children"
                            onChange={(value) => handleSelectCategory(value)}
                            filterOption={(input, option) =>
                                option?.children?.toLowerCase().startsWith(input.toLowerCase()) === true
                            }
                        >
                            {
                                allCatagories.map((cat) => {
                                    return (
                                        <Option key={cat.name} value={cat.name}>{cat.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className="addCat">
                        <p className="addCat-label">Can't find the perfect tag?</p>
                        <div className='addCat-input-container'>
                            <Input placeholder="Add New Category" onChange={(e) => setNewCategory(e.target.value)} />
                            <Button onClick={handleAddNewCategory}><AddIcon /></Button>
                        </div>
                    </div>
                </div>
                <div className="write-btn-group">
                    <Button variant="contained" onClick={handlePostArticle} style={{ backgroundColor: "teal", color: "white" }}>
                        Publish
                    </Button>
                    <Button variant="contained" onClick={() => setShowPreview(!showPreview)} style={{ backgroundColor: "#f50057", color: "white" }}>
                        {showPreview ? "Edit" : "Preview"}
                    </Button>
                </div>

            </form>
            {
                isLoading ? <Loading /> : null
            }
        </div>
    )
}

export default Edit
