import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { action } from '../sagas';
import { InstructionRow } from '../Components/InstructionRow';
import { TwitterResource } from '../Components/TwitterResource';
import { LanguageSelector } from '../Components/LanguageSelector';
import { styles } from './HdyfDialogCommonStyles';
import BlueButton from '../Components/BlueButton';
import { DialogCard, DialogCardHeader } from './DialogCard';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  container: {
    width: `calc(100vw - 96px)`,
    height: `calc(100vh - 64px)`,
    margin: [[24, 'auto']],
    boxShadow: '0 3px 60px 0 rgba(0, 0, 0, 0.16)',
  },
  header: {
    paddingTop: 24,
    height: 120,
    border: `solid 1px ${theme.backgroundBlue}`,
    background: `linear-gradient(179deg, #70adf4 1%, #1a6ef5 156%)`,
    color: theme.white,
    fontSize: '1rem',
    textAlign: 'center',
  },
}));

const hasResources = (resources) => {
  let has = false;
  Object.keys(resources).some((level) => {
    Object.keys(level).some((resourceItem) => {
      if (resourceItem.length) {
        has = true;
      }
      return has;
    });
    return has;
  });
  return has;
};

export function Instructions() {
  const classes = useStyles();
  const ajaxInProgress = useSelector((state) => state.ajax.ajaxInProgress);
  const instructions = useSelector((state) => state.instructions);
  const resources = useSelector((state) => state.resources);
  const [open, setOpen] = useState(true);
  const { dialog_instructions_title, dialog_instructions_content, button_close } = useSelector(
    (state) => state.elements,
  );
  const language = useSelector((state) => state.language);

  useEffect(() => {
    if (!ajaxInProgress) {
      action('INSTRUCTIONS_LOAD_SILENTLY');
    }
  }, [ajaxInProgress]);
  /*

  if (!instructions.length && !hasResources(resources)) {
    return null;
  }
*/

  return (
    <DialogCard className={classes.container}>
      <div className={classes.header}>
        <h2 className={clsx(classes.title)}>{dialog_instructions_title[language]}</h2>
      </div>
    </DialogCard>
  );
}
