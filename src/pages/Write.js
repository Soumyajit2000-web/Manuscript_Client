import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import '../styles/write.css';
import { Button } from '@material-ui/core'

function Write() {
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
                    <input id="fileInput" type="file" style={{ display: "none" }} />
                    <input
                        className="writeInput titleInput"
                        placeholder="Title"
                        type="text"
                        autoFocus={true}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        className="writeInput writeText"
                        placeholder="Tell your story..."
                        type="text"
                        autoFocus={true}
                    />
                </div>
                <Button variant="contained" style={{ backgroundColor: "teal", color: "white" }}>
                    Publish
                </Button>
            </form>
        </div>
    )
}

export default Write
