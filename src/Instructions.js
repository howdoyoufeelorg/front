import React, {useState, useEffect}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ReactFlagsSelect from 'react-flags-select';
import {action} from "./sagas";
import AjaxInProgressDialog from "./Dialogs/AjaxInProgressDialog";
import {Instruction} from "./Instruction";
import {TwitterResource} from "./TwitterResource";

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
                <div className={classes.surveyTitleText}>Thank You</div>
                <ReactFlagsSelect defaultCountry="US" searchable={true} searchPlaceholder="Search for Language"
                                  countries={['US', 'ES']} className={classes.flagDropdown}
                                  customLabels={{"US": "US English", "ES": "Spanish"}}
                                  onSelect={(value) => action('LANGUAGE_SET', {language: value})} />
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
                <Button type="button" onClick={() => setOpen(false)} className={classes.submitButton} variant={"contained"} size={"large"}>CLOSE</Button>
            </DialogActions>
        </Dialog>
    );
}