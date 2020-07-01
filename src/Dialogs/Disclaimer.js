//@flow
import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { LanguageSelector } from '../Components/LanguageSelector';
import { styles } from './HdyfDialogCommonStyles';
import BlueButton, { NextButton } from '../Components/BlueButton';
import { DialogCard, DialogCardContent, DialogCardHeader, DialogCardActions } from './DialogCard';
import Card from '@material-ui/core/Card';
import { ComponentLanguageMapping } from '../Components/DisclaimerContent';
import Image from '../assets/images/Get_Started_Image.png';
import clsx from 'clsx';
import { diagnosisCardStyles } from '../Components/DiagnosisCards/CardStyles';

const useCommonStyles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  card: {
    padding: [[20, 75, 75, 75]],
    borderRadius: 12,
    boxShadow: `0 3px 60px 0 rgba(0, 0, 0, 0.16)`,
    maxWidth: 670,
    width: '80%',
    marginTop: 32,
    fontSize: '1rem',
    fontWeight: 600,
  },
  getStartedTitle: {
    textAlign: 'center',
    color: theme.blue4,
    fontSize: 44,
    fontWeight: 900,
    marginBottom: 22,
  },
  intro: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 506,
    marginBottom: 32,
    lineHeight: 1.2,
  },
  termsTitle: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 900,
  },
  termsContent: {
    fontSize: 15,
    lineHeight: 1.4,
    fontWeight: 'normal',
  },
  getStartedButton: {
    animation: `$pulse 2s infinite`,
    transform: 'scale(1)',
    boxShadow: '0 0 0 0 rgba(86, 133, 247, 1)',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.98)',
      boxShadow: '0 0 0 0 rgba(86, 133, 247, 0.7)',
    },
    '70%': {
      transform: 'scale(1)',
      boxShadow: '0 0 0 10px rgba(86, 133, 247, 0)',
    },
    '100%': {
      transform: 'scale(0.98)',
      boxShadow: '0 0 0 0 rgba(86, 133, 247, 0)',
    },
  },
}));

export function Disclaimer(props: { onNext: () => void, progressCompleted: number }) {
  const commonClasses = useCommonStyles();
  const disclaimerClasses = useStyles();
  const { onNext, progressCompleted } = props;
  const {
    getting_started_title,
    dialog_disclaimer_intro,
    button_start,
    intro_terms_title,
  } = useSelector((state) => state.elements);
  const language = useSelector((state) => state.language);
  const LanguageDisclaimer = ComponentLanguageMapping[language];

  return (
    <React.Fragment>
      <DialogCard>
        <DialogCardHeader
          disableTypography
          displayProgress
          progressCompleted={progressCompleted}
        ></DialogCardHeader>
        <DialogCardContent>
          <Card classes={{ root: disclaimerClasses.card }}>
            <div className={commonClasses.imageContainer}>
              <img src={Image} alt="Logo" />
            </div>
            <div className={clsx(commonClasses.titleText, disclaimerClasses.getStartedTitle)}>
              {getting_started_title[language]}
            </div>
            <div className={disclaimerClasses.intro}>{dialog_disclaimer_intro[language]}</div>
            <div className={disclaimerClasses.termsTitle}>{intro_terms_title[language]}</div>
            <div className={disclaimerClasses.termsContent}>
              <LanguageDisclaimer />
            </div>
          </Card>
        </DialogCardContent>
        <DialogCardActions style={{ marginBottom: 96 }}>
          <NextButton
            variant="default"
            onClick={() => onNext()}
            size="extraLarge"
            className={disclaimerClasses.getStartedButton}
          >
            {button_start[language]}
          </NextButton>
        </DialogCardActions>
      </DialogCard>
    </React.Fragment>
  );
}
