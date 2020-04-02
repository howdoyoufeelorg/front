import React, {useState, useEffect}  from 'react';
import {useSelector} from "react-redux";
import {YesNo} from "./YesNo";
import {Slider} from "./Slider";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ReactFlagsSelect from 'react-flags-select';
import TextField from "@material-ui/core/TextField";
import {action} from "./sagas";

function Question(props)
{
    const {question} = props;
    if (question.type === 'slider') {
        return <Slider question={question} />
    }
    if (question.type === 'yesno') {
        return <YesNo question={question} />
    }
}

const surveyStyles = makeStyles({
    root: {

    },
    surveyTitle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    surveyTitleText: {
        fontSize: 30,
    },
    surveyContent: {
        padding: 40
    },
    surveyActions: {
        padding: [[20,20]]
    },
    question: {
        display: 'flex',
        marginBottom: 25
    },
    submitButton: {
        width: "50%"
    },
    zipCode: {
        fontSize: "1.6rem"
    },
    strecher: {
        height: 160
    },
    flagDropdown: {
        '& img.flag-select__option__icon': {
            fontSize: 20
        },
        '& span.flag-select__option__label': {
            fontSize: '1.2em'
        }
    }
});

const submitSurvey = (questions, answers) => {
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
        alert('You have to give answers to all required questions!')
    } else {
        if(answers['zipcode'].value === '') {
            alert('You have to insert your zipcode!')
        } else {
            action('POST_SURVEY');
        }
    }
};

export function Survey(props)
{
    const classes = surveyStyles();
    const questions = useSelector(state => state.questions);
    const answers = useSelector(state => state.answers);
    const [open, setOpen] = useState(true);
    const { onClose } = props;
    const onButtonClick = () => {
        submitSurvey(questions, answers);
        setOpen(false);
        onClose();
    };
    return (
        <Dialog open={open} fullWidth={true} maxWidth={"md"} disableBackdropClick >
            <DialogTitle className={classes.surveyTitle} disableTypography>
                <div className={classes.surveyTitleText}>How Do You Feel?</div>
                <ReactFlagsSelect defaultCountry="US" searchable={true} searchPlaceholder="Search for Language"
                                  countries={['US', 'ES']} className={classes.flagDropdown}
                                  customLabels={{"US": "US English", "ES": "Spanish"}}
                                  onSelect={(value) => action('LANGUAGE_SET', {language: value})} />
            </DialogTitle>
            <DialogContent className={classes.surveyContent}>
                {
                    questions.map((question, index) => (
                        <div className={classes.question} key={index}>
                            <Question question={question}/>
                        </div>
                    ))
                }
                <ReactFlagsSelect defaultCountry="US" searchable={true} searchPlaceholder="Search for a country"
                                  className={classes.flagDropdown}
                                  onSelect={(value) => action('ANSWER_SET', {questionId: "country", data: {value: value}})}
                />
                <div>
                    <TextField label="Zip code" size={"medium"} onChange={(event) => action('ANSWER_SET', {questionId: "zipcode", data: {value: event.target.value}})}/>
                </div>
                <div className={classes.strecher}>&nbsp;</div>
            </DialogContent>
            <DialogActions className={classes.surveyActions}>
                <Button type="button" onClick={() => onButtonClick()} className={classes.submitButton} variant={"contained"} size={"large"}>SUBMIT</Button>
            </DialogActions>
        </Dialog>
    );
}