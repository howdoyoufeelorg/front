import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfDialogCommonStyles';
import { DialogCard, DialogCardContent } from './DialogCard';

const useStyles = makeStyles(styles);

export function Call911(props) {
  const classes = useStyles();
  const { dialog_call911_title, dialog_call911_content } = useSelector((state) => state.elements);
  const language = useSelector((state) => state.language);
  return (
    <DialogCard>
      <DialogCardContent classes={{ root: classes.content }}>
        <h2 className={classes.title}>{dialog_call911_title[language]}</h2>
        <div style={{ textAlign: 'center' }}>{dialog_call911_content[language]}</div>
      </DialogCardContent>
    </DialogCard>
  );
}
