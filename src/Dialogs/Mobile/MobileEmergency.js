//@flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfMobileDialogCommonStyles';
import { useSelector } from 'react-redux';
import BlueButton from '../../Components/BlueButton';
import AppBar from '@material-ui/core/AppBar';
import { MobileModalContent } from '../../Components/MobileModalContent';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(styles);

export function MobileEmergency(props: { onNext: Function }) {
  const classes = useStyles();
  const { onNext } = props;
  const { dialog_emergency_title, dialog_emergency_content, button_yes, button_no } = useSelector(
    (state) => state.elements,
  );
  const language = useSelector((state) => state.language);
  return (
    <div className={classes.content}>
      <Card className={classes.infoCard}>
        <h2 className={classes.title}>{dialog_emergency_title[language]}</h2>
          <p>STOP NOW and Dial Emergency Services (US – 911) if you are experiencing any of the following:</p>
          <ul>
              <li>Extreme Difficulty with Breathing</li>
              <li>Constant Chest Pain or Pressure</li>
              <li>Extreme Fatigue or lightheadedness</li>
              <li>Disorientation or Unresponsiveness</li>
          </ul>
      </Card>
      <AppBar className={classes.commandBar} position="fixed" variant="elevation">
        <BlueButton
          variant="noShadow"
          className={classes.commandButton}
          onClick={() => onNext(true)}
        >
          {button_yes[language]}
        </BlueButton>
        <BlueButton
          variant="default"
          className={classes.commandButton}
          onClick={() => onNext(false)}
        >
          {button_no[language]}
        </BlueButton>
      </AppBar>
    </div>
  );
}
