//@flow
import React  from 'react';
import {makeStyles} from "@material-ui/core/styles"
import {styles} from "./HdyfMobileDialogCommonStyles"
import {useSelector} from "react-redux"
import BlueButton from "../../Components/BlueButton"
import AppBar from "@material-ui/core/AppBar"
import TextField from "@material-ui/core/TextField"
import {action} from "../../sagas"
import ReactFlagsSelect from "react-flags-select"
import {MobileModalContent} from "../../Components/MobileModalContent";

const useStyles = makeStyles(styles)

export function MobileLocation(props: { onNext: Function, onPrevious: Function }) {
    const classes = useStyles();
    const answers = useSelector(state => state.answers);
    const { onNext, onPrevious } = props;
    const {dialog_location_title, button_next, button_back, zipcode_input_placeholder, country_selector_search_placeholder, alert_missing_zipcode} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    const onButtonClick = () => {
        if(answers['zipcode'].value === '') {
            alert(alert_missing_zipcode[language])
        } else {
            onNext();
        }
    }
    return (
        <>
            <MobileModalContent title={dialog_location_title[language]} renderDrawerContent={() => {
                return <>
                    <div className={classes.formField}>
                        <TextField label={zipcode_input_placeholder[language]} size={"medium"} onChange={(event) => action('ANSWER_SET', {questionId: "zipcode", data: {value: event.target.value}})} value={answers['zipcode'].value}/>
                    </div>
                    <ReactFlagsSelect defaultCountry="US" searchable={true} searchPlaceholder={country_selector_search_placeholder[language]}
                                      className={classes.flagDropdown}
                                      onSelect={(value) => action('ANSWER_SET', {questionId: "country", data: {value: value}})}
                    />
                </>
            }}/>
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="noShadow" className={classes.commandButton} onClick={() => onPrevious()}>{button_back[language]}</BlueButton>
                <BlueButton variant="default" className={classes.commandButton} onClick={() => onButtonClick()}>{button_next[language]}</BlueButton>
            </AppBar>
        </>
    )
}
