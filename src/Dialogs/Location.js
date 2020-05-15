import React, {useState}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions, InputLabel} from "@material-ui/core";
import {LanguageSelector} from "../Components/LanguageSelector";
import {styles} from "./HdyfDialogCommonStyles"
import BlueButton from "../Components/BlueButton"
import ReactFlagsSelect from "react-flags-select"
import {action} from "../sagas"
import {TextField} from "../Components/TextField";

const useStyles = makeStyles(styles)

export function Location(props)
{
    const classes = useStyles();
    const answers = useSelector(state => state.answers);
    const { onNext } = props;
    const {dialog_location_title, dialog_location_content, button_next, zipcode_input_placeholder, country_selector_search_placeholder, alert_missing_zipcode} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    const onButtonClick = () => {
        if(answers['zipcode'].value === '') {
            alert(alert_missing_zipcode[language])
        } else {
            onNext();
        }
    }
    return (
        <Dialog open={true} fullWidth={true} maxWidth={"md"} disableBackdropClick >
            <DialogTitle className={classes.title} disableTypography>
                <div className={classes.titleText}>{dialog_location_title[language]}</div>
                <LanguageSelector/>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <div className={classes.formField}>
                    <TextField label={zipcode_input_placeholder[language]} size={"medium"} onChange={(event) => action('ANSWER_SET', {questionId: "zipcode", data: {value: event.target.value}})} value={answers['zipcode'].value}/>
                </div>
                <div>
                <InputLabel>{country_selector_search_placeholder[language]}</InputLabel>
                <ReactFlagsSelect defaultCountry="US" searchable={true} searchPlaceholder={country_selector_search_placeholder[language]}
                                  className={classes.flagDropdown}
                                  onSelect={(value) => action('ANSWER_SET', {questionId: "country", data: {value: value}})}
                />
                </div>
                <div className={classes.strecher}>&nbsp;</div>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <BlueButton variant="default" onClick={() => onButtonClick()} size="large">{button_next[language]}</BlueButton>
            </DialogActions>
        </Dialog>
    );
}
