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

const useStyles = makeStyles(styles)

export function MobileBasicInfo(props)
{
    const classes = useStyles();
    const { onNext, onPrevious } = props;
    const {dialog_basic_info_title, dialog_basic_info_content, button_next, button_back, age_input_placeholder, gender_input_placeholder, race_input_placeholder} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <>
            <h1 className={classes.title}>{dialog_basic_info_title[language]}</h1>
            <Card className={classes.surveyCard}>
                <div>
                    <InputLabel>{age_input_placeholder[language]}</InputLabel>
                    <TextField label={age_input_placeholder[language]} size={"medium"} onChange={(event) => action('ANSWER_SET', {questionId: "age", data: {value: event.target.value}})}/>
                </div>
                <div>
                    <InputLabel>{gender_input_placeholder[language]}</InputLabel>
                    <Select size={"medium"}
                            onChange={(event) => action('ANSWER_SET', {questionId: "gender", data: {value: event.target.value}})}
                    >
                        {
                            genderChoices[language].map((item, index) => <option key={index} value={item}>{item}</option>)
                        }
                    </Select>
                </div>
                <div>
                    <InputLabel>{race_input_placeholder[language]}</InputLabel>
                    <Select size={"medium"}
                            onChange={(event) => action('ANSWER_SET', {questionId: "race", data: {value: event.target.value}})}
                    >
                        {
                            raceChoices[language].map((item, index) => <option key={index} value={item}>{item}</option>)
                        }
                    </Select>
                </div>
            </Card>
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="noShadow" className={classes.commandButton} onClick={() => onPrevious()}>{button_back[language]}</BlueButton>
                <BlueButton variant="default" className={classes.commandButton} onClick={() => onNext()}>{button_next[language]}</BlueButton>
            </AppBar>
        </>
    )
}