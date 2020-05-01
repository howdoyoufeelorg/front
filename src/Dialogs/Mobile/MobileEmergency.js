import React, {useState}  from 'react';
import {makeStyles} from "@material-ui/core/styles"
import {styles} from "./HdyfMobileDialogCommonStyles"
import {useSelector} from "react-redux"
import {LanguageSelector} from "../../Components/LanguageSelector"
import BlueButton from "../../Components/BlueButton"
import Card from "@material-ui/core/Card"
import AppBar from "@material-ui/core/AppBar"

const useStyles = makeStyles(styles)

export function MobileEmergency(props)
{
    const classes = useStyles();
    const { onClose } = props;
    const onButtonClick = (response) => {
        onClose(response);
    };
    const {dialog_emergency_title, dialog_emergency_content, button_yes, button_no} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <>
            <h1 className={classes.title}>{dialog_emergency_title[language]}</h1>
            <Card className={classes.infoCard}>
                {dialog_emergency_content[language]}
            </Card>
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="noShadow" className={classes.commandButton} onClick={() => onButtonClick(true)}>{button_yes[language]}</BlueButton>
                <BlueButton variant="default" className={classes.commandButton} onClick={() => onButtonClick(false)}>{button_no[language]}</BlueButton>
            </AppBar>
        </>
    )
}