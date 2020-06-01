//@flow
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfMobileDialogCommonStyles';
import { useSelector } from 'react-redux';
import { BackButton, NextButton } from '../../Components/BlueButton';
import AppBar from '@material-ui/core/AppBar';
import { action } from '../../sagas';
import { Slider } from '../../Components/Slider/Slider';
import { YesNo } from '../../Components/YesNo';
import { Entry } from '../../Components/Entry';
import clsx from 'clsx';
import { ProgressBar } from '../../Components/ProgressBar';

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

export function MobileSurvey(props: {
  onClose: Function,
  onPrevious: Function,
  progressCompleted: number,
}) {
  const classes = useStyles();
  const { onPrevious, onClose, progressCompleted } = props;
  const language = useSelector((state) => state.language);
  const questions = useSelector((state) => state.questions);
  const answers = useSelector((state) => state.answers);
  const { alert_required_questions, dialog_survey_title, button_submit, button_back } = useSelector(
    (state) => state.elements,
  );
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
        <ProgressBar progressCompleted={progressCompleted} />
        <div className={classes.actionButtons}>
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
        </div>
      </AppBar>
    </div>
  );
}
