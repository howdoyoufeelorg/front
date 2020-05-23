// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfMobileDialogCommonStyles';
import { useSelector } from 'react-redux';
import BlueButton from '../../Components/BlueButton';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import { MobileModalContent } from '../../Components/MobileModalContent';

const useStyles = makeStyles(styles);

export function MobileDisclaimer(props: { onNext: Function }) {
  const classes = useStyles();
  const { onNext } = props;
  const { getting_started_title, dialog_disclaimer_content, button_start } = useSelector(
    (state) => state.elements,
  );
  const language = useSelector((state) => state.language);
  return (
    <div>
      <Card className={classes.infoCard}>
        <h2 className={classes.title}>{getting_started_title[language]}</h2>
        {dialog_disclaimer_content[language]}
      </Card>
      <Card className={classes.infoCard}>{dialog_disclaimer_content[language]}</Card>
      <AppBar className={classes.commandBar} position="fixed" variant="elevation">
        <BlueButton variant="default" className={classes.commandButton} onClick={() => onNext()}>
          {button_start[language]}
        </BlueButton>
      </AppBar>
    </div>
  );
}
