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
import Image from '../assets/images/Medical_Illustration.png';

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
}));

export function Disclaimer(props: { onNext: () => void, progressCompleted: number }) {
  const commonClasses = useCommonStyles();
  const disclaimerClasses = useStyles();
  const { onNext, progressCompleted } = props;
  const { getting_started_title, dialog_disclaimer_content, button_start } = useSelector(
    (state) => state.elements,
  );
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
          <div className={commonClasses.titleText} style={{ color: '#00355a' }}>
            {getting_started_title[language]}
          </div>
          <Card classes={{ root: disclaimerClasses.card }}>
            <div className={commonClasses.imageContainer}>
              <img src={Image} alt="Logo" />
            </div>

            <LanguageDisclaimer />
          </Card>
        </DialogCardContent>
        <DialogCardActions style={{ marginBottom: 96 }}>
          <NextButton variant="default" onClick={() => onNext()} size="extraLarge">
            {button_start[language]}
          </NextButton>
        </DialogCardActions>
      </DialogCard>
    </React.Fragment>
  );
}
