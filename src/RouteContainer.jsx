import React, { useState, useEffect } from 'react'
import Homepage from './pages/Homepage';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import PostPage from './pages/PostPage';
import { Routes, Route } from 'react-router-dom'
import Toast from './components/common/Toast';
import Navbar from './components/Navbar';
import { getUserDetails } from './services/users';
import Loading from './components/common/Loading';
import { getImage } from './services/imagesReq';
import Edit from './pages/Edit';
import AboutUs from './pages/AboutUs';

const RouteContainer = (props) => {
    const { isLogin, setIsLogin } = props;
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastSeverity, setToastSeverity] = useState("");
    const [toastMessage, setToastMesssage] = useState("");
    const [accountDetails, setAccountDetails] = useState({
        aboutAuthor: "",
        createdAt: "",
        email: "",
        profilepic: "",
        updatedAt: "",
        username: "",
        __v: 0,
        _id: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [profilePicBuffer, setProfilePicBuffer] = useState();

    // functions to handle toasts
    const onToastOpen = (toastProps) => {
        const { severity, message } = toastProps;
        setToastSeverity(severity);
        setToastMesssage(message);
        setIsToastOpen(true)
    }

    const onToastClose = () => {
        setToastMesssage("");
        setToastSeverity("");
        setIsToastOpen(false);
    }

    //Fetch account details
    const handleGetAccountDetails = async () => {
        setIsLoading(true);
        try {
            let response = await getUserDetails(localStorage.getItem("Account-Id"));
            console.log(response.data);
            setAccountDetails(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            onToastOpen({
                severity: "error",
                message: "Something went wrong!!!"
            })
            setTimeout(() => {
                onToastClose();
            }, 5000)
        }
    }

    useEffect(() => {
        if (isLogin === true) {
            handleGetAccountDetails();
        }
    }, [isLogin])

    useEffect(() => {
        if (localStorage.getItem("Account-Id")) {
            setIsLogin(true)
        }
    }, [])

    //Fetch profilePic
    const handleGetProfilePic = async () => {
        if (accountDetails.profilepic !== "") {
            setIsLoading(true);
            try {
                const resp = await getImage(accountDetails.profilepic);
                setProfilePicBuffer(resp.data.image.data.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        } else if (accountDetails.profilepic === "") {
            setProfilePicBuffer([]);
        }

    }

    useEffect(() => {
        if (accountDetails) {
            handleGetProfilePic();
        }
    }, [accountDetails])

    return (
        <>
            <Navbar
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                profilePicBuffer={profilePicBuffer}
                accountDetails={accountDetails}
                setAccountDetails={setAccountDetails}
            />
            <Toast
                isToastOpen={isToastOpen}
                toastSeverity={toastSeverity}
                toastMessage={toastMessage}
                setIsToastOpen={setIsToastOpen}
            />

            <Routes>
                <Route exact path="/" element={<Homepage isLogin={isLogin} />} />
                <Route path="/register" element={
                    <Register
                        onToastOpen={onToastOpen}
                        onToastClose={onToastClose}
                    />
                } />
                <Route path="/login" element={
                    <Login
                        onToastOpen={onToastOpen}
                        onToastClose={onToastClose}
                        setIsLogin={setIsLogin}
                    />
                } />
                <Route path="/write" element={isLogin ? <Write accountDetails={accountDetails} /> : <h1>Must Be Logged In</h1>} />
                <Route path="/edit/:id" element={isLogin ? <Edit accountDetails={accountDetails} /> : <h1>Must Be Logged In</h1>} />
                <Route path="/settings" element={isLogin ? (
                    <Settings
                        accountDetails={accountDetails}
                        setAccountDetails={setAccountDetails}
                        setProfilePicBuffer={setProfilePicBuffer}
                        profilePicBuffer={profilePicBuffer}

                    />
                ) : <h1>Must Be Logged In</h1>
                } />
                <Route path="/post/:postId" element={
                    <PostPage
                        accountDetails={accountDetails}
                        onToastClose={onToastClose}
                        onToastOpen={onToastOpen}
                    />
                }
                />
                <Route path="/about" element={
                    <AboutUs />
                }
                />
            </Routes>
            {
                isLoading ? <Loading /> : null
            }
        </>
    )
}

export default RouteContainer