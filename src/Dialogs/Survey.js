import React, {useState, useEffect}  from 'react';
import {useSelector} from "react-redux";
import {YesNo} from "../Components/YesNo";
import {Slider} from "../Components/Slider";
import {Entry} from "../Components/Entry";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import ReactFlagsSelect from 'react-flags-select';
import TextField from "@material-ui/core/TextField";
import {action} from "../sagas";
import {LanguageSelector} from "../Components/LanguageSelector";
import {styles} from "./HdyfDialogCommonStyles"
import BlueButton from "../Components/BlueButton"


function Question(props)
{
    const {question} = props;
    if (question.type === 'slider') {
        return <Slider question={question} />
    }
    if (question.type === 'yesno') {
        return <YesNo question={question} />
    }
    if (question.type === 'entry') {
        return <Entry question={question} />
    }
    return null;
}

const useStyles = makeStyles(styles);

export function Survey(props)
{
    const classes = useStyles();
    const questions = useSelector(state => state.questions);
    const answers = useSelector(state => state.answers);
    const { onPrevious, onClose } = props;
    const {alert_required_questions, alert_missing_zipcode,
        dialog_survey_title, dialog_survey_content, button_submit, button_back} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    const onButtonClick = () => {
        let required = questions.filter((question) => question.required === true);
        Object.keys(answers).forEach((key) => {
            required = required.filter((question) => question.id !== parseInt(key));
            // The code below was able to monitor Additional Data - in case it ever becomes Required
            // const question = required.find((question) => question.id === parseInt(key));
            // if(question && question.requiresAdditionalData) {
            //     if(answers[key].answer === 'NO' || (typeof(answers[key].additionalData) !== 'undefined' && answers[key].additionalData!=='') ) {
            //         required = required.filter((question) => question.id !== parseInt(key));
            //     }
            // } else {
            //     required = required.filter((question) => question.id !== parseInt(key));
            // }
        });
        if(required.length) {
            alert(alert_required_questions[language])
        } else {
            action('POST_SURVEY');
        }
    };
    useEffect(() => {
        action('QUESTIONS_LOAD');
    }, []);

    if (!questions.length) {
        return null;
    }

    return (
        <Dialog open={true} fullWidth={true} maxWidth={"md"} disableBackdropClick >
            <DialogTitle className={classes.title} disableTypography>
                <div className={classes.titleText}>{dialog_survey_title[language]}</div>
                <LanguageSelector/>
            </DialogTitle>
            <DialogContent className={classes.content}>
                {
                    questions.map((question, index) => (
                        <div className={classes.question} key={index}>
                            <Question question={question}/>
                        </div>
                    ))
                }
            </DialogContent>
            <DialogActions className={classes.actions}>
                <BlueButton variant="noShadow" onClick={() => onPrevious()} size="large">{button_back[language]}</BlueButton>
                <BlueButton variant="default" onClick={() => onButtonClick()} size="large">{button_submit[language]}</BlueButton>
            </DialogActions>
        </Dialog>
    );
}