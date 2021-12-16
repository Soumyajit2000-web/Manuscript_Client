import { Button, Typography } from '@material-ui/core'
import React from 'react'
import AuthorDetails from '../components/AuthorDetails'
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import '../styles/postPage.css'

function PostPage() {
    return (
        <div className="postPageContainer">
            <AuthorDetails />
            <div className="postContent">
                <div className="postImage">
                    <img src="https://media.istockphoto.com/photos/freedom-chains-that-transform-into-birds-charge-concept-picture-id1322104312?b=1&k=20&m=1322104312&s=170667a&w=0&h=VQyPkFkMKmo0e4ixjhiOLjiRs_ZiyKR_4SAsagQQdkk=" alt="" />
                </div>
                <div className="postTitle">
                    <Typography variant="h6"> Title </Typography>
                    <div className="titleIcons">
                        <Button style={{borderRadius: "100px", minWidth: "45px", minHeight: "45px"}}><EditRoundedIcon /></Button>
                        <Button style={{borderRadius: "100px", minWidth: "45px", minHeight: "45px"}}><DeleteIcon /></Button>
                    </div>
                </div>
                <div className="postDetails">
                    <Typography variant="h6" style={{color: "rgba(0, 0, 0, 0.54)", fontWeight: "400"}}> Author Name </Typography>
                </div>
                <div className="postBody">
                    <Typography variant="body2" style={{color: "rgba(0, 0, 0, 0.54)"}}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit nostrum dolore ad cum quia, quaerat deserunt adipisci perspiciatis quas debitis accusantium? Et asperiores nulla inventore magni, dignissimos fugiat nisi voluptatibus earum optio, numquam voluptates enim ullam! Unde deserunt sapiente minima voluptatem eveniet facere cum laudantium sint error quasi sunt ab sit consequatur, magnam aperiam repellendus dolore nobis. Fuga, cupiditate dolor id rerum temporibus a tempore necessitatibus saepe ipsa. Eveniet, ut dolore incidunt pariatur rem facilis recusandae. Illum placeat corrupti officiis soluta, sint voluptatem consequuntur optio, ab laudantium cumque dicta iste et ea quo cum tempora. Excepturi voluptatum accusamus debitis quas.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit nostrum dolore ad cum quia, quaerat deserunt adipisci perspiciatis quas debitis accusantium? Et asperiores nulla inventore magni, dignissimos fugiat nisi voluptatibus earum optio, numquam voluptates enim ullam! Unde deserunt sapiente minima voluptatem eveniet facere cum laudantium sint error quasi sunt ab sit consequatur, magnam aperiam repellendus dolore nobis. Fuga, cupiditate dolor id rerum temporibus a tempore necessitatibus saepe ipsa. Eveniet, ut dolore incidunt pariatur rem facilis recusandae. Illum placeat corrupti officiis soluta, sint voluptatem consequuntur optio, ab laudantium cumque dicta iste et ea quo cum tempora. Excepturi voluptatum accusamus debitis quas.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit nostrum dolore ad cum quia, quaerat deserunt adipisci perspiciatis quas debitis accusantium? Et asperiores nulla inventore magni, dignissimos fugiat nisi voluptatibus earum optio, numquam voluptates enim ullam! Unde deserunt sapiente minima voluptatem eveniet facere cum laudantium sint error quasi sunt ab sit consequatur, magnam aperiam repellendus dolore nobis. Fuga, cupiditate dolor id rerum temporibus a tempore necessitatibus saepe ipsa. Eveniet, ut dolore incidunt pariatur rem facilis recusandae. Illum placeat corrupti officiis soluta, sint voluptatem consequuntur optio, ab laudantium cumque dicta iste et ea quo cum tempora. Excepturi voluptatum accusamus debitis quas.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit nostrum dolore ad cum quia, quaerat deserunt adipisci perspiciatis quas debitis accusantium? Et asperiores nulla inventore magni, dignissimos fugiat nisi voluptatibus earum optio, numquam voluptates enim ullam! Unde deserunt sapiente minima voluptatem eveniet facere cum laudantium sint error quasi sunt ab sit consequatur, magnam aperiam repellendus dolore nobis. Fuga, cupiditate dolor id rerum temporibus a tempore necessitatibus saepe ipsa. Eveniet, ut dolore incidunt pariatur rem facilis recusandae. Illum placeat corrupti officiis soluta, sint voluptatem consequuntur optio, ab laudantium cumque dicta iste et ea quo cum tempora. Excepturi voluptatum accusamus debitis quas.
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default PostPage
