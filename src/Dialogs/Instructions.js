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
import {styles} from "./HdyfDialogCommonStyles"

const useStyles = makeStyles(styles);

const hasResources = (resources) => {
    let has = false;
    Object.keys(resources).some((level) => {
            Object.keys(level).some((resourceItem) => {
                    if (resourceItem.length) {
                        has = true;
                    }
                    return has;
                }
            )
            return has;
        }
    )
    return has;
}

export function Instructions()
{
    const classes = useStyles();
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

    if (!instructions.length && !hasResources(resources)) {
        return (<AjaxInProgressDialog/>)
    }

    return (
        <Dialog open={open} fullWidth={true} maxWidth={"md"} disableBackdropClick >
            <DialogTitle className={classes.title} disableTypography>
                <div className={classes.titleText}>{dialog_instructions_title[language]}</div>
                <LanguageSelector/>
            </DialogTitle>
            <DialogContent className={classes.content}>
                INSTRUCTIONS FOR YOUR AREA
                <hr/>
                {instructions.map((instruction, index) => <Instruction data={instruction} key={index} />)}
                <hr />
                <hr />
                {
                    resources.area && resources.area.twitterResources.length ? <>
                        LATEST TWITTER POSTS FOR YOUR AREA
                        <hr/>
                            {resources.area.twitterResources.map((data, index) => <TwitterResource profile={data.value} key={index} />)}
                        </>
                        :
                        ""
                }
                {
                    resources.state && resources.state.twitterResources.length ? <>
                            LATEST TWITTER POSTS FOR YOUR STATE
                            <hr/>
                            {resources.state.twitterResources.map((data, index) => <TwitterResource profile={data.value} key={index} />)}
                        </>
                        :
                        ""
                }

            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button type="button" onClick={() => setOpen(false)} className={classes.submitButton} variant={"contained"} size={"large"}>{button_close[language]}</Button>
            </DialogActions>
        </Dialog>
    );
}