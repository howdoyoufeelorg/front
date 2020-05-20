import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles"
import {styles} from "./HdyfMobileDialogCommonStyles"
import {useSelector} from "react-redux"
import BlueButton from "../../Components/BlueButton"
import Card from "@material-ui/core/Card"
import AppBar from "@material-ui/core/AppBar"
import {Instruction} from "../../Components/Instruction"
import {TwitterResource} from "../../Components/TwitterResource"
import {action} from "../../sagas"

const useStyles = makeStyles(styles)

export function MobileInstructions(props)
{
    const classes = useStyles();
    const { onClose } = props;
    const onButtonClick = () => {
        onClose();
    };
    const {dialog_instructions_title, button_close} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);

    const instructions = useSelector(state => state.instructions);
    const resources = useSelector(state => state.resources);
    const ajaxInProgress = useSelector(state => state.ajax.ajaxInProgress);
    useEffect(() => {
        if(!ajaxInProgress) {
            action('INSTRUCTIONS_LOAD_SILENTLY');
        }
    }, [ajaxInProgress]);
    return (
        <>
            <h1 className={classes.title}>{dialog_instructions_title[language]}</h1>
            <Card className={classes.infoCard}>
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
            </Card>
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="default" className={classes.commandButton} onClick={() => onButtonClick()}>{button_close[language]}</BlueButton>
            </AppBar>
        </>
    )
}
