//@flow
import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { LanguageSelector } from '../Components/LanguageSelector';
import { styles } from './HdyfDialogCommonStyles';
import BlueButton from '../Components/BlueButton';
import { DialogCard, DialogCardContent, DialogCardHeader, DialogCardActions } from './DialogCard';
import Card from '@material-ui/core/Card';

const useCommonStyles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
    borderRadius: 12,
    boxShadow: `0 3px 60px 0 rgba(0, 0, 0, 0.16)`,
    width: 670,
    marginTop: 32,
    fontSize: '1rem',
  },
}));

export function Disclaimer(props: { onNext: () => void }) {
  const commonClasses = useCommonStyles();
  const disclaimerClasses = useStyles();
  const { onNext } = props;
  const { getting_started_title, dialog_disclaimer_content, button_start } = useSelector(
    (state) => state.elements,
  );
  const language = useSelector((state) => state.language);
  return (
    <React.Fragment>
      <DialogCard>
        <DialogCardHeader disableTypography displayProgress progressCompleted={20}>
          <div></div>
          <LanguageSelector />
        </DialogCardHeader>
        <DialogCardContent>
          <div className={commonClasses.titleText}>{getting_started_title[language]}</div>
          <Card classes={{ root: disclaimerClasses.card }}>
            {dialog_disclaimer_content[language]}
          </Card>
        </DialogCardContent>
        <DialogCardActions style={{ marginBottom: 96 }}>
          <BlueButton variant="default" onClick={() => onNext()} size="large">
            {button_start[language]}
          </BlueButton>
        </DialogCardActions>
      </DialogCard>
    </React.Fragment>
  );
}
