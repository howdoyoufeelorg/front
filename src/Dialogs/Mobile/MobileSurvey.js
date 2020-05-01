import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles"
import {styles} from "./HdyfMobileDialogCommonStyles"
import {useSelector} from "react-redux"
import {LanguageSelector} from "../../Components/LanguageSelector"
import BlueButton from "../../Components/BlueButton"
import Card from "@material-ui/core/Card"
import AppBar from "@material-ui/core/AppBar"
import {action} from "../../sagas"
import AjaxInProgressDialog from "../AjaxInProgressDialog"
import {Slider} from "../../Components/Slider"
import {YesNo} from "../../Components/YesNo"
import {Entry} from "../../Components/Entry"

const useStyles = makeStyles(styles)

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


export function MobileSurvey(props)
{
    const classes = useStyles();
    const { onNext, onPrevious, onClose, step } = props;
    const language = useSelector(state => state.language);
    const questions = useSelector(state => state.questions);
    const answers = useSelector(state => state.answers);
    const {alert_required_questions, alert_missing_zipcode,
        dialog_survey_title, dialog_survey_content, button_submit, button_back, button_next,
        zipcode_input_placeholder, country_selector_search_placeholder} = useSelector(state => state.elements);
    const onButtonClick = () => {
        onNext();
    }
    const onSubmitClick = () => {
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
            if(answers['zipcode'].value === '') {
                alert(alert_missing_zipcode[language])
            } else {
                action('POST_SURVEY');
                onClose();
            }
        }
    };
    useEffect(() => {
        action('QUESTIONS_LOAD');
    }, []);

    if (!questions.length) {
        return (<AjaxInProgressDialog/>)
    }
    const question = questions[step-1];
    const lastQuestion = questions.length === step;
    return (
        <>
            <h1 className={classes.title}>{dialog_survey_title[language]}</h1>
            <Card className={classes.surveyCard}>
                <div className={classes.question}>
                    <Question question={question}/>
                </div>
            </Card>
            <AppBar className={classes.commandBar} position="fixed" variant="elevation">
                <BlueButton variant="noShadow" className={classes.commandButton} onClick={() => onPrevious()}>{button_back[language]}</BlueButton>
                {lastQuestion ?
                    <BlueButton variant="default" className={classes.commandButton} onClick={() => onSubmitClick()}>{button_submit[language]}</BlueButton>
                    :
                    <BlueButton variant="default" className={classes.commandButton} onClick={() => onNext()}>{button_next[language]}</BlueButton>
                }
            </AppBar>
        </>
    )
}