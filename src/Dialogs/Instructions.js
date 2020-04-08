import React, {useState, useEffect}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {action} from "../sagas";
import AjaxInProgressDialog from "../Dialogs/AjaxInProgressDialog";
import {Instruction} from "../Components/Instruction";
import {TwitterResource} from "../Components/TwitterResource";
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


export function Instructions()
{
    const classes = surveyStyles();
    const ajaxInProgress = useSelector(state => state.ajax.ajaxInProgress);
    const instructions = useSelector(state => state.instructions);
    const resources = useSelector(state => state.resources);
    const [open, setOpen] = useState(true);
    const {dialog_instructions_title, dialog_instructions_content, button_close} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);

    useEffect(() => {
        if(!ajaxInProgress) {
            action('INSTRUCTIONS_LOAD_SILENTLY');
        }
    }, [ajaxInProgress]);

    if (!instructions.length && !resources.length) {
        return (<AjaxInProgressDialog/>)
    }

    return (
        <Dialog open={open} fullWidth={true} maxWidth={"md"} disableBackdropClick >
            <DialogTitle className={classes.surveyTitle} disableTypography>
                <div className={classes.surveyTitleText}>{dialog_instructions_title[language]}</div>
                <LanguageSelector/>
            </DialogTitle>
            <DialogContent className={classes.surveyContent}>
                INSTRUCTIONS FOR YOUR AREA
                <hr/>
                {instructions.map((instruction, index) => <Instruction data={instruction} key={index} />)}
                <hr />
                <hr />
                {
                    resources.area && resources.area.twitterResources.length ? <>
                        LATEST TWITTER POSTS FOR YOUR AREA
                        <hr/>
                            {resources.area.twitterResources.map((profile, index) => <TwitterResource profile={profile} key={index} />)}
                        </>
                        :
                        ""
                }
                {
                    resources.state && resources.state.twitterResources.length ? <>
                            LATEST TWITTER POSTS FOR YOUR STATE
                            <hr/>
                            {resources.state.twitterResources.map((profile, index) => <TwitterResource profile={profile} key={index} />)}
                        </>
                        :
                        ""
                }

            </DialogContent>
            <DialogActions className={classes.surveyActions}>
                <Button type="button" onClick={() => setOpen(false)} className={classes.submitButton} variant={"contained"} size={"large"}>{button_close[language]}</Button>
            </DialogActions>
        </Dialog>
    );
}