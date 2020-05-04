import React, {useState}  from 'react';
import {makeStyles} from "@material-ui/core/styles"
import {styles} from "./HdyfMobileDialogCommonStyles"
import {useSelector} from "react-redux"
import {LanguageSelector} from "../../Components/LanguageSelector"
import BlueButton from "../../Components/BlueButton"
import Card from "@material-ui/core/Card"
import AppBar from "@material-ui/core/AppBar"

const useStyles = makeStyles(styles)

export function MobileDisclaimer(props)
{
    const classes = useStyles();
    const { onNext } = props;
    const {dialog_disclaimer_title, dialog_disclaimer_content, button_start} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <>
            <h1 className={classes.title}>{dialog_disclaimer_title[language]}</h1>
            <Card className={classes.infoCard}>
                <img src="HDYFLogo@2x.png" alt="TEST IMAGE" />
                {dialog_disclaimer_content[language]}
            </Card>
            <Card className={classes.surveyCard}>
                <img src="HDYFLogo@2x.png" alt="TEST IMAGE" />
                {dialog_disclaimer_content[language]}
            </Card>
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="default" className={classes.commandButton} onClick={() => onNext()}>{button_start[language]}</BlueButton>
            </AppBar>
        </>
    )
}