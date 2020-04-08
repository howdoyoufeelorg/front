import React, {useState}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {LanguageSelector} from "../Components/LanguageSelector";
import {styles} from "./HdyfDialogCommonStyles"

const useStyles = makeStyles(styles);


export function Emergency(props)
{
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const { onClose } = props;
    const onButtonClick = (response) => {
        setOpen(false);
        onClose(response);
    };
    const {dialog_emergency_title, dialog_emergency_content, button_yes, button_no} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <Dialog open={open} fullWidth={true} maxWidth={"md"} disableBackdropClick >
            <DialogTitle className={classes.title} disableTypography>
                <div className={classes.titleText}>{dialog_emergency_title[language]}</div>
                <LanguageSelector/>
            </DialogTitle>
            <DialogContent className={classes.content}>
                {dialog_emergency_content[language]}
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button type="button" onClick={() => onButtonClick(true)} className={classes.submitButton} variant={"contained"} size={"large"}>{button_yes[language]}</Button>
                <Button type="button" onClick={() => onButtonClick(false)} className={classes.submitButton} variant={"contained"} size={"large"}>{button_no[language]}</Button>
            </DialogActions>
        </Dialog>
    );
}