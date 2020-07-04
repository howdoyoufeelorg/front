//@flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfMobileDialogCommonStyles';
import { useSelector } from 'react-redux';
import { NextButton } from '../../Components/BlueButton';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import { ComponentLanguageMapping } from '../../Components/DisclaimerContent';
import Image from '../../assets/images/Get_Started_Image.png';
import clsx from 'clsx';
import { ProgressBar } from '../../Components/ProgressBar';

const useStyles = makeStyles(styles);

export function MobileDisclaimer(props: { onNext: Function, progressCompleted: number }) {
  const classes = useStyles();
  const { onNext, progressCompleted } = props;
  const {
    getting_started_title,
    button_start,
    dialog_disclaimer_intro,
    intro_terms_title,
  } = useSelector((state) => state.elements);

  const language = useSelector((state) => state.language);

  const LanguageDisclaimer = ComponentLanguageMapping[language];

  return (
    <div className={classes.content}>
      <Card className={classes.infoCard}>
        <div className={classes.imageContainer} style={{ marginTop: 16 }}>
          <img src={Image} alt="Logo" />
        </div>
        <h2 className={clsx(classes.title, classes.titleLarge)} style={{marginBottom: 20}}>
          {getting_started_title[language]}
        </h2>
        <div className={classes.intro}>{dialog_disclaimer_intro[language]}</div>
        <div className={classes.termsTitle}>{intro_terms_title[language]}</div>
        <LanguageDisclaimer />
      </Card>
      <AppBar className={classes.commandBar} position="fixed" variant="elevation">
        <ProgressBar progressCompleted={progressCompleted} />
        <div className={classes.actionButtons}>
          <NextButton
            variant="default"
            className={classes.commandButton}
            onClick={() => onNext()}
            size="extraLarge"
          >
            {button_start[language]}
          </NextButton>
        </div>
      </AppBar>
    </div>
  );
}
