import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfMobileDialogCommonStyles';
import { useSelector } from 'react-redux';
import { LanguageSelector } from '../../Components/LanguageSelector';
import BlueButton, {BackButton, NextButton} from '../../Components/BlueButton';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import { action } from '../../sagas';
import { Slider } from '../../Components/Slider';
import { YesNo } from '../../Components/YesNo';
import { Entry } from '../../Components/Entry';
import clsx from 'clsx';

const useStyles = makeStyles(styles);

function Question(props) {
  const { question } = props;
  if (question.type === 'slider') {
    return <Slider question={question} />;
  }
  if (question.type === 'yesno') {
    return <YesNo question={question} />;
  }
  if (question.type === 'entry') {
    return <Entry question={question} />;
  }
  return null;
}

export function MobileSurvey(props) {
  const classes = useStyles();
  const { onPrevious, onClose } = props;
  const language = useSelector((state) => state.language);
  const questions = useSelector((state) => state.questions);
  const answers = useSelector((state) => state.answers);
  const {
    alert_required_questions,
    alert_missing_zipcode,
    dialog_survey_title,
    dialog_survey_content,
    button_submit,
    button_back,
  } = useSelector((state) => state.elements);
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
    if (required.length) {
      alert(alert_required_questions[language]);
    } else {
      action('POST_SURVEY');
      onClose();
    }
  };
  useEffect(() => {
    action('QUESTIONS_LOAD');
  }, []);

  if (!questions.length) {
    return null;
  }
  return (
    <div className={clsx(classes.content, classes.backgroundWhite)}>
      <h2 className={clsx(classes.title, classes.titleMedium)} style={{ marginBottom: 20 }}>
        {dialog_survey_title[language]}
      </h2>
      <div className={classes.surveyCard}>
        {questions.map((question, index) => (
          <div className={classes.question} key={index}>
            <Question question={question} />
          </div>
        ))}
      </div>
      <AppBar className={classes.commandBar} position="fixed" variant="elevation">
        <BackButton
          variant="noShadow"
          className={classes.commandButton}
          onClick={() => onPrevious()}
          size="regular"
        >
          {button_back[language]}
        </BackButton>
        <NextButton
          variant="default"
          className={classes.commandButton}
          onClick={() => onSubmitClick()}
          size="large"
        >
          {button_submit[language]}
        </NextButton>
      </AppBar>
    </div>
  );
}
