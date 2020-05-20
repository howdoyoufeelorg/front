//@flow
import * as React from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {LanguageSelector} from "../Components/LanguageSelector";
import {styles} from "./HdyfDialogCommonStyles"
import BlueButton from "../Components/BlueButton"
import {Dialog, DialogContent, DialogTitle, DialogActions} from "./Dialog";

const useStyles = makeStyles(styles)

export function Disclaimer(props: { onNext: () => void })
{
    const classes = useStyles();
    const { onNext } = props;
    const {dialog_disclaimer_title, dialog_disclaimer_content, button_start} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <React.Fragment>
            <Dialog>
                <DialogTitle disableTypography displayProgress progressCompleted={25}>
                    <div className={classes.titleText}>{dialog_disclaimer_title[language]}</div>
                    <LanguageSelector/>
                </DialogTitle>
                <DialogContent>
                    {dialog_disclaimer_content[language]}
                </DialogContent>
                <DialogActions>
                    <BlueButton variant="default" onClick={() => onNext()} size="large">{button_start[language]}</BlueButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
