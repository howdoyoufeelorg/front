import React, {useState}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {LanguageSelector} from "../Components/LanguageSelector";
import {styles} from "./HdyfDialogCommonStyles"
import {useIsMobile} from "../Hooks/useIsMobile"

const useStyles = makeStyles(styles);


export function Disclaimer(props)
{
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const isMobile = useIsMobile();
    const { onClose } = props;
    const onButtonClick = () => {
        setOpen(false);
        onClose();
    };
    const {dialog_disclaimer_title, dialog_disclaimer_content, button_start} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <Dialog open={open} fullWidth={true} maxWidth={"md"} disableBackdropClick >
            <DialogTitle className={classes.title} disableTypography>
                <div className={classes.titleText}>{dialog_disclaimer_title[language]}{isMobile ? ' M' : ''}</div>
                <LanguageSelector/>
            </DialogTitle>
            <DialogContent className={classes.content}>
                {dialog_disclaimer_content[language]}
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button type="button" onClick={() => onButtonClick()} className={classes.submitButton} variant={"contained"} size={"large"}>{button_start[language]}</Button>
            </DialogActions>
        </Dialog>
    );
}