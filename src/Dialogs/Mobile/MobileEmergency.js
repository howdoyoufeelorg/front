//@flow
import React from 'react';
import {makeStyles} from "@material-ui/core/styles"
import {styles} from "./HdyfMobileDialogCommonStyles"
import {useSelector} from "react-redux"
import BlueButton from "../../Components/BlueButton"
import AppBar from "@material-ui/core/AppBar"
import {MobileModalContent} from "../../Components/MobileModalContent";

const useStyles = makeStyles(styles)

export function MobileEmergency(props: { onNext: Function })
{
    const classes = useStyles();
    const { onNext } = props;
    const {dialog_emergency_title, dialog_emergency_content, button_yes, button_no} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <>
            <MobileModalContent title={dialog_emergency_title[language]} renderDrawerContent={() => {
                return dialog_emergency_content[language]
            }} />
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="noShadow" className={classes.commandButton} onClick={() => onNext(true)}>{button_yes[language]}</BlueButton>
                <BlueButton variant="default" className={classes.commandButton} onClick={() => onNext(false)}>{button_no[language]}</BlueButton>
            </AppBar>
        </>
    )
}
