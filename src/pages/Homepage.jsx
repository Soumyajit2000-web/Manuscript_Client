import React, { useState, useEffect } from 'react'
import PostCard from '../components/PostCardNew';
import Cta from '../components/Cta';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Typography } from '@material-ui/core';
import '../styles/homepage.scss'
import { getAllCategories } from '../services/categories';
import { getAllPosts } from '../services/posts';
import { useNavigate } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

function Homepage(props) {
    const { setIsLoading, isLogin } = props;
    const [postsResponse, setPostsResponse] = useState([]);
    const [categoryResponse, setCategoryResponse] = useState([]);
    const [selectedCatagory, setSelectedCatagory] = useState("");
    const classes = useStyles();
    const navigate = useNavigate();

    const handleGetCategories = async () => {
        setIsLoading(true)
        try {
            let response = await getAllCategories();
            setCategoryResponse(response.data)
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    const handleGetAllPosts = async (user = "", cat = "") => {
        setIsLoading(true);
        try {
            let response = await getAllPosts(user, cat);
            setPostsResponse(response.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetCategories();
        // handleGetAllPosts();
    }, [])

    useEffect(() => {
        handleGetAllPosts("", selectedCatagory)
    }, [selectedCatagory])

    const handleCatClick = (e, label) => {
        // console.info(e.target.innerText);
        setSelectedCatagory(e.target.innerText)
    };

    return (
        <>
            {
                isLogin ? null : <Cta />
            }
            <div className="postContainer">
                <div className="chips">
                    <Typography varient="h6" style={{ fontWeight: "bolder", marginBottom: "1rem" }}>
                        DISCOVER MORE OF WHAT MATTERS TO YOU
                    </Typography>
                    <div className={classes.root}>
                        {
                            categoryResponse.map((category) => {
                                return <Chip label={category.name} key={category.name} component="a" onClick={(e, label) => handleCatClick(e, label)} clickable />
                            })
                        }
                    </div>
                </div>

                <div className="posts">

                    <Typography varient="h5" style={{ textDecoration: "underline", fontSize: "1.5rem", fontWeight: "bolder", textTransform: "uppercase" }}>
                        {selectedCatagory ? selectedCatagory : "TRENDING"}
                    </Typography>

                    <div className="postWrapper">
                        {
                            postsResponse.map((post) => {
                                return (
                                    <div onClick={() => navigate(`/post/${post._id}`)}>
                                        <PostCard
                                            title={post.title}
                                            desc={post.desc}
                                            photo={post.photo}
                                            username={post.username}
                                            userId={post.userId}
                                            date={post.createdAt}
                                            categories={post.categories}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

            </div>


        </>
    )
}

export default Homepage
