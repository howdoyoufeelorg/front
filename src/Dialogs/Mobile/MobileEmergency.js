//@flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfMobileDialogCommonStyles';
import { useSelector } from 'react-redux';
import BlueButton, { BackButton, NextButton } from '../../Components/BlueButton';
import AppBar from '@material-ui/core/AppBar';
import { MobileModalContent } from '../../Components/MobileModalContent';
import Card from '@material-ui/core/Card';
import { ComponentLanguageMapping } from '../../Components/DisclaimerContent';
import { EmergencyLanguageMapping } from '../../Components/EmergencyContent';
import clsx from 'clsx';
import { ProgressBar } from '../../Components/ProgressBar';

const useStyles = makeStyles(styles);

export function MobileEmergency(props: { onNext: Function, progressCompleted: number }) {
  const classes = useStyles();
  const { onNext, progressCompleted } = props;
  const { dialog_emergency_title, dialog_emergency_content, button_yes, button_no } = useSelector(
    (state) => state.elements,
  );
  const language = useSelector((state) => state.language);
  const LanguageEmergency = EmergencyLanguageMapping[language];
  return (
    <div className={classes.content}>
      <Card className={classes.infoCard}>
        <h2 className={clsx(classes.title, classes.titleMedium)}>
          {dialog_emergency_title[language]}
        </h2>
        <LanguageEmergency />
      </Card>
      <AppBar className={classes.commandBar} position="fixed" variant="elevation">
        <ProgressBar progressCompleted={progressCompleted} />
        <div className={classes.actionButtons}>
          <BackButton
            variant="noShadow"
            className={classes.commandButton}
            onClick={() => onNext(true)}
            size="regular"
          >
            {button_yes[language]}
          </BackButton>
          <NextButton
            variant="default"
            className={classes.commandButton}
            onClick={() => onNext(false)}
            size="large"
          >
            {button_no[language]}
          </NextButton>
        </div>
      </AppBar>
    </div>
  );
}
