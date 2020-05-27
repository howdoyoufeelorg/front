// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfMobileDialogCommonStyles';
import { useSelector } from 'react-redux';
import BlueButton from '../../Components/BlueButton';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import { ComponentLanguageMapping } from '../../Components/DisclaimerContent';
import Image from '../../assets/images/Medical_Illustration.png';
import clsx from 'clsx';

console.log('Image', Image);

const useStyles = makeStyles(styles);

export function MobileDisclaimer(props: { onNext: Function }) {
  const classes = useStyles();
  const { onNext } = props;
  const { getting_started_title, button_start } = useSelector((state) => state.elements);

  const language = useSelector((state) => state.language);

  const LanguageDisclaimer = ComponentLanguageMapping[language];

  return (
    <div className={classes.content}>
      <Card className={classes.infoCard}>
        <h2 className={clsx(classes.title, classes.titleLarge)}>
          {getting_started_title[language]}
        </h2>
        <div className={classes.imageContainer}>
          <img src={Image} alt="Logo" />
        </div>
        <LanguageDisclaimer />
      </Card>
      <AppBar className={classes.commandBar} position="fixed" variant="elevation">
        <BlueButton
          variant="default"
          className={classes.commandButton}
          onClick={() => onNext()}
          size="extraLarge"
        >
          {button_start[language]}
        </BlueButton>
      </AppBar>
    </div>
  );
}
