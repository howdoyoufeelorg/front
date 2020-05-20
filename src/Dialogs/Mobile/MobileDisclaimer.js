// @flow
import React from 'react';
import {makeStyles} from "@material-ui/core/styles"
import {styles} from "./HdyfMobileDialogCommonStyles"
import {useSelector} from "react-redux"
import BlueButton from "../../Components/BlueButton"
import Card from "@material-ui/core/Card"
import AppBar from "@material-ui/core/AppBar"
import {MobileModalContent} from "../../Components/MobileModalContent";

const useStyles = makeStyles(styles)

export function MobileDisclaimer(props: { onNext: Function }) {
    const classes = useStyles();
    const { onNext } = props;
    const {dialog_disclaimer_title, dialog_disclaimer_content, button_start} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <>
            <MobileModalContent title={dialog_disclaimer_title[language]} renderDrawerContent={() => {
                return dialog_disclaimer_content[language]
            }}>
                <Card className={classes.infoCard}>
                    {dialog_disclaimer_content[language]}
                </Card>
            </MobileModalContent>
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="default" className={classes.commandButton} onClick={() => onNext()}>{button_start[language]}</BlueButton>
            </AppBar>
        </>
    )
}
