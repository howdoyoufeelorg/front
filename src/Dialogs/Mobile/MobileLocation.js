import React, {useState}  from 'react';
import {makeStyles} from "@material-ui/core/styles"
import {styles} from "./HdyfMobileDialogCommonStyles"
import {useSelector} from "react-redux"
import {LanguageSelector} from "../../Components/LanguageSelector"
import BlueButton from "../../Components/BlueButton"
import Card from "@material-ui/core/Card"
import AppBar from "@material-ui/core/AppBar"
import TextField from "@material-ui/core/TextField"
import {action} from "../../sagas"
import ReactFlagsSelect from "react-flags-select"

const useStyles = makeStyles(styles)

export function MobileLocation(props)
{
    const classes = useStyles();
    const answers = useSelector(state => state.answers);
    const { onNext, onPrevious } = props;
    const {dialog_location_title, dialog_location_content, button_next, button_back, zipcode_input_placeholder, country_selector_search_placeholder, alert_missing_zipcode} = useSelector(state => state.elements);
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
            <h1 className={classes.title}>{dialog_location_title[language]}</h1>
            <Card className={classes.surveyCard}>
                <div className={classes.formField}>
                    <TextField label={zipcode_input_placeholder[language]} size={"medium"} onChange={(event) => action('ANSWER_SET', {questionId: "zipcode", data: {value: event.target.value}})} value={answers['zipcode'].value}/>
                </div>
                <ReactFlagsSelect defaultCountry="US" searchable={true} searchPlaceholder={country_selector_search_placeholder[language]}
                                  className={classes.flagDropdown}
                                  onSelect={(value) => action('ANSWER_SET', {questionId: "country", data: {value: value}})}
                />
                <div className={classes.strecher}>&nbsp;</div>
            </Card>
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="noShadow" className={classes.commandButton} onClick={() => onPrevious()}>{button_back[language]}</BlueButton>
                <BlueButton variant="default" className={classes.commandButton} onClick={() => onButtonClick()}>{button_next[language]}</BlueButton>
            </AppBar>
        </>
    )
}
