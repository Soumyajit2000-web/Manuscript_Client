import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Toast(props) {
    const classes = useStyles();
    const { isToastOpen, toastSeverity, toastMessage, setIsToastOpen } = props;

    return (
        <div className={classes.root}>
            <Collapse in={isToastOpen}>
                <Alert
                    severity={toastSeverity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsToastOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {toastMessage}
                </Alert>
            </Collapse>
        </div>
    );
}