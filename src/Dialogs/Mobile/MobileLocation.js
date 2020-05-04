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
import Select from "@material-ui/core/Select"
import {genderChoices, raceChoices} from "../../translations"
import InputLabel from "@material-ui/core/InputLabel"
import ReactFlagsSelect from "react-flags-select"
import {DialogContent} from "@material-ui/core"

const useStyles = makeStyles(styles)

export function MobileLocation(props)
{
    const classes = useStyles();
    const answers = useSelector(state => state.answers);
    const { onNext } = props;
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
                <div>
                    <TextField label={zipcode_input_placeholder[language]} size={"medium"} onChange={(event) => action('ANSWER_SET', {questionId: "zipcode", data: {value: event.target.value}})}/>
                </div>
                <ReactFlagsSelect defaultCountry="US" searchable={true} searchPlaceholder={country_selector_search_placeholder[language]}
                                  className={classes.flagDropdown}
                                  onSelect={(value) => action('ANSWER_SET', {questionId: "country", data: {value: value}})}
                />
                <div className={classes.strecher}>&nbsp;</div>
            </Card>
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="default" className={classes.commandButton} onClick={() => onButtonClick()}>{button_next[language]}</BlueButton>
            </AppBar>
        </>
    )
}