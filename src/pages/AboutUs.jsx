import React from 'react';
import '../styles/AboutUs.scss';
import Arunava from '../images/AP.jpeg';
import Avik from '../images/AR.jpg';
import Soumyajit from '../images/SD.jpg';
import Tanmoy from '../images/TC.jpg';
import Illustraion from '../images/P1-removebg-preview.png'

function AboutUs() {
    return (
        <div className="main">
        <div className="about-webPage">
            <div className="about-content">
                <h1 className="heading">Transmogrify
                    the art of daily experiences</h1>
                <div className="sub-heading">
                    <p className="subheading">Manuscript is an open-source platform for the
                        bloggers, where they can post their blogs/articles on their interested topic, which will be
                        reviewed and scaled by others. In short, we can wrap it up like that it is a social blogging
                        media platform, where people will be able to exchange their experience with everyone under
                        a single umbrella.<br/><br/>

                        In this 21st century blogging has become an inseparable part of our daily lives which
                        completes a blank space full of lively enjoyment experiences. To make it more friendly and
                        easy to share our project is developed with its intrigging design and social media features to
                        communicate with others.<br/><br/>

                        Upgradation has always been a necessary part for everything from humans to technology, so
                        according to that view this App can be displayed as daily blogs with a sip of hatched
                        technology.</p>
                </div>
            </div>
            <div className="about-img">
                <img src={Illustraion} alt=""/>
            </div>
        </div>
        <div className="team-section">
            <div className="title">
                <h1 className="team"><u>The Minds Behind Manuscript</u></h1>
            </div>
            <div className="container">

                <div className="card">

                    <img src={Arunava} alt="" className="profile-pic" />

                    <div className="member-info">
                        <span className="name">Arunava Pal</span>
                        <span className="subtitle">Web Designer</span>
                        <span className="description">A final year B.Tech student in CSE discipline,
                            passionate about web development.
                        </span>
                    </div>
                </div>
                <div className="card">

                    <img src={Soumyajit} alt="" className="profile-pic"/>

                    <div className="member-info">
                        <span className="name">Soumyajit Das</span>
                        <span className="subtitle">Full-Stack Developer</span>
                        <span className="description">A Full-Stack developer with a deranged
                            passion of web development, currently pursuing B.Tech in CSE.
                        </span>
                    </div>
                </div>
                <div className="card">

                    <img src={Avik} alt="" className="profile-pic"/>

                    <div className="member-info">
                        <span className="name">Avik Roy</span>
                        <span className="subtitle">Back-End Developer</span>
                        <span className="description">A passionate developer with in-depth knowledge in DSA and
                            Back-End technologies.
                        </span>
                    </div>
                </div>
                <div className="card">

                    <img src={Tanmoy} alt="" className="profile-pic"/>

                    <div className="member-info">
                        <span className="name">Tanmoy Chatterjee</span>
                        <span className="subtitle">Database Developer</span>
                        <span className="description">A CSE grad student with a bulk concept of DSA
                            and competitive programming.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AboutUs