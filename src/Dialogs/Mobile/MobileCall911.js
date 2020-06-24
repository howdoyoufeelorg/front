//@flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfMobileDialogCommonStyles';
import { useSelector } from 'react-redux';
import BlueButton from '../../Components/BlueButton';
import AppBar from '@material-ui/core/AppBar';
import { MobileModalContent } from '../../Components/MobileModalContent';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(styles);

export function MobileCall911(props: { onClose: Function }) {
  const classes = useStyles();
  const { onClose } = props;
  const onButtonClick = () => {
    onClose();
  };
  const { dialog_call911_title, dialog_call911_content, button_close } = useSelector(
    (state) => state.elements,
  );
  const language = useSelector((state) => state.language);
  return (
    <div className={classes.content}>
      <Card className={classes.infoCard}>
        <h2 className={clsx(classes.title, classes.titleMedium)}>
          {dialog_call911_title[language]}
        </h2>
        {dialog_call911_content[language]}
      </Card>
      <AppBar className={classes.commandBar} position="fixed" variant="elevation">
        <BlueButton
          variant="default"
          className={classes.commandButton}
          onClick={() => onButtonClick()}
        >
          {button_close[language]}
        </BlueButton>
      </AppBar>
    </div>
  );
}
