//@flow
import React  from 'react';
import {makeStyles} from "@material-ui/core/styles"
import {styles} from "./HdyfMobileDialogCommonStyles"
import {useSelector} from "react-redux"
import BlueButton from "../../Components/BlueButton"
import AppBar from "@material-ui/core/AppBar"
import {MobileModalContent} from "../../Components/MobileModalContent";

const useStyles = makeStyles(styles)

export function MobileCall911(props: { onClose: Function })
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
            <MobileModalContent drawerTitle={dialog_call911_title[language]} renderDrawerContent={() => {
                return dialog_call911_content[language];
            } } />
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="default" className={classes.commandButton} onClick={() => onButtonClick()}>{button_close[language]}</BlueButton>
            </AppBar>
        </>
    )
}
