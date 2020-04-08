import React, {useState}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {LanguageSelector} from "../Components/LanguageSelector";

const surveyStyles = makeStyles({
    root: {

    },
    surveyTitle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    surveyTitleText: {
        fontSize: 30,
    },
    surveyContent: {
        padding: 40
    },
    surveyActions: {
        padding: [[20,20]]
    },
    question: {
        display: 'flex',
        marginBottom: 25
    },
    submitButton: {
        width: "50%"
    },
    zipCode: {
        fontSize: "1.6rem"
    },
    strecher: {
        height: 160
    },
    flagDropdown: {
        '& img.flag-select__option__icon': {
            fontSize: 20
        },
        '& span.flag-select__option__label': {
            fontSize: '1.2em'
        }
    }
});


export function Disclaimer(props)
{
    const classes = surveyStyles();
    const [open, setOpen] = useState(true);
    const { onClose } = props;
    const onButtonClick = () => {
        setOpen(false);
        onClose();
    };
    const {dialog_disclaimer_title, dialog_disclaimer_content, button_start} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <Dialog open={open} fullWidth={true} maxWidth={"md"} disableBackdropClick >
            <DialogTitle className={classes.surveyTitle} disableTypography>
                <div className={classes.surveyTitleText}>{dialog_disclaimer_title[language]}</div>
                <LanguageSelector/>
            </DialogTitle>
            <DialogContent className={classes.surveyContent}>
                {dialog_disclaimer_content[language]}
            </DialogContent>
            <DialogActions className={classes.surveyActions}>
                <Button type="button" onClick={() => onButtonClick()} className={classes.submitButton} variant={"contained"} size={"large"}>{button_start[language]}</Button>
            </DialogActions>
        </Dialog>
    );
}