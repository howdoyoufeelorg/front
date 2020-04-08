import React, {useState}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {LanguageSelector} from "../Components/LanguageSelector";
import {styles} from "./HdyfDialogCommonStyles"


const useStyles = makeStyles(styles);


export function Call911(props)
{
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const {dialog_call911_title, dialog_call911_content, button_close} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <Dialog open={open} fullWidth={true} maxWidth={"md"} disableBackdropClick >
            <DialogTitle className={classes.title} disableTypography>
                <div className={classes.titleText}>{dialog_call911_title[language]}</div>
                <LanguageSelector/>
            </DialogTitle>
            <DialogContent className={classes.content}>
                {dialog_call911_content[language]}
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button type="button" onClick={() => setOpen(false)} className={classes.submitButton} variant={"contained"} size={"large"}>{button_close[language]}</Button>
            </DialogActions>
        </Dialog>
    );
}