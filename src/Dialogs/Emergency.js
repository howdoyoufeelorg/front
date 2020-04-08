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


export function Emergency(props)
{
    const classes = surveyStyles();
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
            <DialogTitle className={classes.surveyTitle} disableTypography>
                <div className={classes.surveyTitleText}>{dialog_emergency_title[language]}</div>
                <LanguageSelector/>
            </DialogTitle>
            <DialogContent className={classes.surveyContent}>
                {dialog_emergency_content[language]}
            </DialogContent>
            <DialogActions className={classes.surveyActions}>
                <Button type="button" onClick={() => onButtonClick(true)} className={classes.submitButton} variant={"contained"} size={"large"}>{button_yes[language]}</Button>
                <Button type="button" onClick={() => onButtonClick(false)} className={classes.submitButton} variant={"contained"} size={"large"}>{button_no[language]}</Button>
            </DialogActions>
        </Dialog>
    );
}