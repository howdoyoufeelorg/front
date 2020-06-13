//@flow
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { YesNo } from '../Components/YesNo';
import { Slider } from '../Components/Slider/Slider';
import { Entry } from '../Components/Entry';
import { makeStyles } from '@material-ui/core/styles';
import { action } from '../sagas';
import { LanguageSelector } from '../Components/LanguageSelector';
import { styles } from './HdyfDialogCommonStyles';
import BlueButton, { BackButton, NextButton } from '../Components/BlueButton';
import { DialogCard, DialogCardActions, DialogCardContent, DialogCardHeader } from './DialogCard';

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

const useStyles = makeStyles(styles);

export function Survey(props: {
  onPrevious: () => void,
  onClose: () => void,
  progressCompleted: number,
}) {
  const classes = useStyles();
  const questions = useSelector((state) => state.questions);
  const answers = useSelector((state) => state.answers);
  const { onPrevious, onClose, progressCompleted } = props;
  const {
    alert_required_questions,
    alert_missing_zipcode,
    dialog_survey_title,
    dialog_survey_content,
    button_submit,
    button_back,
  } = useSelector((state) => state.elements);
  const language = useSelector((state) => state.language);
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
    <DialogCard>
      <DialogCardHeader displayProgress progressCompleted={progressCompleted}></DialogCardHeader>
      <DialogCardContent className={classes.content} style={{ alignItems: 'stretch' }}>
        <h2 className={classes.title} style={{ marginBottom: 60, marginTop: 0 }}>
          {dialog_survey_title[language]}
        </h2>
        {questions.map((question, index) => (
          <div className={classes.question} key={index}>
            <Question question={question} />
          </div>
        ))}
      </DialogCardContent>
      <DialogCardActions className={classes.actions}>
        <BackButton variant="noShadow" onClick={() => onPrevious()} size="regular">
          {button_back[language]}
        </BackButton>
        <NextButton variant="default" onClick={() => onButtonClick()} size="large">
          {button_submit[language]}
        </NextButton>
      </DialogCardActions>
    </DialogCard>
  );
}
