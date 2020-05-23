import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { LanguageSelector } from '../Components/LanguageSelector';
import { styles } from './HdyfDialogCommonStyles';
import BlueButton from '../Components/BlueButton';
import { DialogCardActions, DialogCard, DialogCardContent, DialogCardHeader } from './DialogCard';

const useStyles = makeStyles(styles);

export function Emergency(props) {
  const classes = useStyles();
  const { onNext } = props;
  const { dialog_emergency_title, dialog_emergency_content, button_yes, button_no } = useSelector(
    (state) => state.elements,
  );
  const language = useSelector((state) => state.language);
  return (
    <DialogCard>
      <DialogCardHeader displayProgress progressCompleted={40}>
        <div className={classes.titleText}>{dialog_emergency_title[language]}</div>
        <LanguageSelector />
      </DialogCardHeader>
      <DialogCardContent>{dialog_emergency_content[language]}</DialogCardContent>
      <DialogCardActions>
        <BlueButton variant="noShadow" onClick={() => onNext(true)} size={'large'}>
          {button_yes[language]}
        </BlueButton>
        <BlueButton variant="default" onClick={() => onNext(false)} size={'large'}>
          {button_no[language]}
        </BlueButton>
      </DialogCardActions>
    </DialogCard>
  );
}
