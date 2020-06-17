import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Slider } from './Slider/Slider';
import { TextField } from '@material-ui/core';
import { action } from '../sagas';
import BlueButton from './BlueButton';
import { useIsMobile } from '../Hooks/useIsMobile';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
  textRoot: {
    '& input': {
      fontWeight: 600,
      fontSize: 24,
      textAlign: 'center',
    },
  },
  adornment: {
    '& .MuiTypography-root': {
      fontWeight: 600,
      fontSize: 24,
      color: '#333',
    },
  },
  questionTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 900,
    marginBottom: 10,
  },
  questionTitleDesktop: {
    textAlign: 'left',
    width: '100%',
    marginRight: 10,
  },
  additionalDataTitleDesktop: {
    textAlign: 'right',
    marginRight: 20,
    paddingTop: 0,
  },
  yesNoWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  yesNoWrapperDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  buttonWrapperDesktop: {
    width: 'auto',
  },
  buttonSeparator: {
    width: 30,
    border: 'thin solid 2px',
  },
  additionalDataWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 35,
  },
  additionalDataWrapperDesktop: {
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 15,
  },
}));

export function YesNo(props) {
  const { question } = props;
  const answers = useSelector((state) => state.answers);
  const currentAnswer = answers[question.id];
  const state = currentAnswer === undefined ? null : currentAnswer.answer === 'YES';
  const { button_no, button_yes } = useSelector((state) => state.elements);
  const language = useSelector((state) => state.language);
  const classes = useStyles();
  const { isMobile } = useIsMobile();
  let additionalDataInput;
  if (question.additionalDataType === 'slider') {
    additionalDataInput = <Slider />;
  }
  if (question.additionalDataType === 'yesno') {
    additionalDataInput = <YesNo />;
  }
  if (question.additionalDataType === 'entry') {
    additionalDataInput = (
      <TextField
        classes={{ root: classes.textRoot }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" className={classes.adornment}></InputAdornment>
          ),
        }}
        onChange={(event) =>
          action('ANSWER_SET', {
            questionId: question.id,
            data: { additionalData: event.target.value },
          })
        }
      />
    );
  }
  return (
    <>
      <div className={clsx(classes.yesNoWrapper, !isMobile && classes.yesNoWrapperDesktop)}>
        <div className={clsx(classes.questionTitle, !isMobile && classes.questionTitleDesktop)}>
          {question.labels[language]}
        </div>
        <div className={clsx(classes.buttonWrapper, !isMobile && classes.buttonWrapperDesktop)}>
          <BlueButton
            onClick={() =>
              action('ANSWER_SET', { questionId: question.id, data: { answer: 'YES' } })
            }
            selected={state === true}
            size={isMobile ? 'xSmall' : 'small'}
          >
            {button_yes[language]}
          </BlueButton>
          <div className={classes.buttonSeparator} />
          <BlueButton
            onClick={() =>
              action('ANSWER_SET', { questionId: question.id, data: { answer: 'NO' } })
            }
            selected={state === false}
            size={isMobile ? 'xSmall' : 'small'}
          >
            {button_no[language]}
          </BlueButton>
        </div>
      </div>
      {state && question.requiresAdditionalData ? (
        <div
          className={clsx(
            classes.additionalDataWrapper,
            !isMobile && classes.additionalDataWrapperDesktop,
          )}
        >
          <div
            className={clsx(
              classes.questionTitle,
              !isMobile && classes.questionTitleDesktop,
              !isMobile && classes.additionalDataTitleDesktop,
            )}
          >
            {question.additionalDataLabels[language]}
          </div>
          {additionalDataInput}
        </div>
      ) : (
        ''
      )}
    </>
  );
}
