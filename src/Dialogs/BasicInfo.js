import React, {useState}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import {LanguageSelector} from "../Components/LanguageSelector";
import {styles} from "./HdyfDialogCommonStyles"
import BlueButton from "../Components/BlueButton"
import {action} from "../sagas"
import Select from "@material-ui/core/Select"
import {genderChoices, raceChoices} from "../translations"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import {TextField} from "../Components/FormFields/TextField";

const useStyles = makeStyles(styles)

export function BasicInfo(props)
{
    const classes = useStyles();
    const answers = useSelector(state => state.answers);
    const { onPrevious, onNext } = props;
    const {dialog_basic_info_title, dialog_basic_info_content, age_input_placeholder, age_input_label, gender_input_placeholder, race_input_placeholder, button_next, button_back} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    return (
        <Dialog open={true} fullWidth={true} maxWidth={"md"} disableBackdropClick >
            <DialogTitle className={classes.title} disableTypography>
                <div className={classes.titleText}>{dialog_basic_info_title[language]}</div>
                <LanguageSelector/>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <div className={classes.formField}>
                    <TextField
                        size={"medium"}
                        label={age_input_label[language]}
                        placeholder={age_input_placeholder[language]}
                        onChange={(event) => action('ANSWER_SET', {questionId: "age", data: {value: event.target.value}})} value={answers['age'].value}/>
                </div>
                <div className={classes.formField}>
                    <TextField size={"medium"} select
                            label={gender_input_placeholder[language]}
                            onChange={(event) => action('ANSWER_SET', {questionId: "gender", data: {value: event.target.value}})}
                            value={answers['gender'].value}
                    >
                        {
                            genderChoices[language].map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                        }
                    </TextField>
                </div>
                <div className={classes.formField}>
                    <TextField size={"medium"} select label={race_input_placeholder[language]}
                            onChange={(event) => action('ANSWER_SET', {questionId: "race", data: {value: event.target.value}})}
                            value={answers['race'].value}
                    >
                        {
                            raceChoices[language].map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                        }
                    </TextField>
                </div>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <BlueButton variant="noShadow" onClick={() => onPrevious()} size="large">{button_back[language]}</BlueButton>
                <BlueButton variant="default" onClick={() => onNext()} size="large">{button_next[language]}</BlueButton>
            </DialogActions>
        </Dialog>
    );
}
