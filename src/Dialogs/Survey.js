import React, {useState, useEffect}  from 'react';
import {useSelector} from "react-redux";
import {YesNo} from "../Components/YesNo";
import {Slider} from "../Components/Slider";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ReactFlagsSelect from 'react-flags-select';
import TextField from "@material-ui/core/TextField";
import {action} from "../sagas";
import {LanguageSelector} from "../Components/LanguageSelector";
import AjaxInProgressDialog from "./AjaxInProgressDialog";
import {styles} from "./HdyfDialogCommonStyles"


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

const useStyles = makeStyles(Object.assign({}, styles, {

    question: {
        display: 'flex',
        marginBottom: 25
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
}));

export function Survey(props)
{
    const classes = useStyles();
    const questions = useSelector(state => state.questions);
    const answers = useSelector(state => state.answers);
    const [open, setOpen] = useState(true);
    const { onClose } = props;
    const {alert_required_questions, alert_missing_zipcode,
        dialog_survey_title, dialog_survey_content, button_submit,
        zipcode_input_placeholder, country_selector_search_placeholder} = useSelector(state => state.elements);
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
            if(answers['zipcode'].value === '') {
                alert(alert_missing_zipcode[language])
            } else {
                action('POST_SURVEY');
                setOpen(false);
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

    return (
        <Dialog open={open} fullWidth={true} maxWidth={"md"} disableBackdropClick >
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
                <ReactFlagsSelect defaultCountry="US" searchable={true} searchPlaceholder={country_selector_search_placeholder[language]}
                                  className={classes.flagDropdown}
                                  onSelect={(value) => action('ANSWER_SET', {questionId: "country", data: {value: value}})}
                />
                <div>
                    <TextField label={zipcode_input_placeholder[language]} size={"medium"} onChange={(event) => action('ANSWER_SET', {questionId: "zipcode", data: {value: event.target.value}})}/>
                </div>
                <div className={classes.strecher}>&nbsp;</div>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button type="button" onClick={() => onButtonClick()} className={classes.submitButton} variant={"contained"} size={"large"}>{button_submit[language]}</Button>
            </DialogActions>
        </Dialog>
    );
}