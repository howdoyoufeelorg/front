import React, {useState}  from 'react';
import {makeStyles} from "@material-ui/core/styles"
import {styles} from "./HdyfMobileDialogCommonStyles"
import {useSelector} from "react-redux"
import {LanguageSelector} from "../../Components/LanguageSelector"
import BlueButton from "../../Components/BlueButton"
import Card from "@material-ui/core/Card"
import AppBar from "@material-ui/core/AppBar"

const useStyles = makeStyles(styles)

export function MobileCall911(props)
{
    const classes = useStyles();
    const { onClose } = props;
    const onButtonClick = () => {
        onClose();
    };
    const {dialog_call911_title, dialog_call911_content, button_close} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <>
            <h1 className={classes.title}>{dialog_call911_title[language]}</h1>
            <Card className={classes.infoCard}>
                {dialog_call911_content[language]}
            </Card>
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="default" className={classes.commandButton} onClick={() => onButtonClick()}>{button_close[language]}</BlueButton>
            </AppBar>
        </>
    )
}