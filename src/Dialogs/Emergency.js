//@flow
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { LanguageSelector } from '../Components/LanguageSelector';
import { styles } from './HdyfDialogCommonStyles';
import BlueButton, { BackButton, NextButton } from '../Components/BlueButton';
import { DialogCardActions, DialogCard, DialogCardContent, DialogCardHeader } from './DialogCard';
import { EmergencyLanguageMapping } from '../Components/EmergencyContent';

const useStyles = makeStyles(styles);

export function Emergency(props: { onNext: (boolean) => void, progressCompleted: number }) {
  const classes = useStyles();
  const { onNext, progressCompleted } = props;
  const { dialog_emergency_content, button_yes, button_no } = useSelector(
    (state) => state.elements,
  );
  const language = useSelector((state) => state.language);
  const LanguageEmergency = EmergencyLanguageMapping[language];
  return (
    <DialogCard>
      <DialogCardHeader displayProgress progressCompleted={progressCompleted}></DialogCardHeader>
      <DialogCardContent classes={{ root: classes.content }}>
        <h2 className={classes.title}>{dialog_emergency_content[language]}</h2>
        <div>
          <LanguageEmergency />
        </div>
      </DialogCardContent>
      <DialogCardActions>
        <BlueButton variant="noShadow" onClick={() => onNext(true)} size={'regular'}>
          {button_yes[language]}
        </BlueButton>
        <BlueButton variant="noShadow" onClick={() => onNext(false)} size={'regular'}>
          {button_no[language]}
        </BlueButton>
      </DialogCardActions>
    </DialogCard>
  );
}
