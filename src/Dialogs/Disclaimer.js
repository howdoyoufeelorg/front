import React, {useState}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import {LanguageSelector} from "../Components/LanguageSelector";
import {styles} from "./HdyfDialogCommonStyles"
import BlueButton from "../Components/BlueButton"

const useStyles = makeStyles(styles)

export function Disclaimer(props)
{
    const classes = useStyles();
    const { onNext } = props;
    const {dialog_disclaimer_title, dialog_disclaimer_content, button_start} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <Dialog open={true} fullWidth={true} maxWidth={"md"} disableBackdropClick >
            <DialogTitle className={classes.title} disableTypography>
                <div className={classes.titleText}>{dialog_disclaimer_title[language]}</div>
                <LanguageSelector/>
            </DialogTitle>
            <DialogContent className={classes.content}>
                {dialog_disclaimer_content[language]}
            </DialogContent>
            <DialogActions className={classes.actions}>
                <BlueButton variant="default" onClick={() => onNext()} size="large">{button_start[language]}</BlueButton>
            </DialogActions>
        </Dialog>
    );
}