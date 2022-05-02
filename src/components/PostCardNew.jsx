import React from 'react';
import ShareIcon from '@material-ui/icons/Share';
import Avatar from '@material-ui/core/Avatar';
import '../styles/postCard.scss'


function PostCard() {
    return (
        <div>
            <main className="card">

                <div className="card_background">
                    <img src="https://media.istockphoto.com/photos/freedom-chains-that-transform-into-birds-charge-concept-picture-id1322104312?b=1&k=20&m=1322104312&s=170667a&w=0&h=VQyPkFkMKmo0e4ixjhiOLjiRs_ZiyKR_4SAsagQQdkk=" className='card-img' alt="Drawers" />
                </div>

                <div className="content">

                    <h3 className="content_intro">
                        Shift the overall look and feel by adding these wonderful
                        touches to furniture in your home
                    </h3>

                    <p className="content_paragraph">
                        Ever been in a room and felt like something was missing? Perhaps
                        it felt slightly bare and uninviting. I’ve got some simple tips to help you make any room feel complete.
                    </p>

                    <div className="avatar">

                        {/* <img src="images/avatar-michelle.jpg" alt="Michelle" className="avatar_av-img"/> */}
                        <span className='avatar_av-img'><Avatar alt="Remy Sharp" /></span>
                        <div className="avatar_info">

                            <div className="_info_name">Michelle Appleton</div>
                            <div className="_info_date">28 Jun 2020</div>

                        </div>

                        <span className="avatar_share-img"><ShareIcon /></span>

                    </div>

                </div>

            </main>
        </div>

    );
}

export default PostCard;
