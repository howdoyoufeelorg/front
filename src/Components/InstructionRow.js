//@flow
import React from 'react';
import { useSelector } from 'react-redux';
import type { Instruction } from '../models/Instruction';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const styles = (theme) => ({
  wrapper: {
    padding: [[16, 0]],
  },
  duration: {
    textAlign: 'right',
    fontStyle: 'italic',
    fontWeight: 'bold',
      marginBottom: 8
  },
});

const useStyles = makeStyles(styles);

export function InstructionRow(props: { instruction: Instruction }) {
  const classes = useStyles();
  const { instruction } = props;
  const language = useSelector((state) => state.language);

  const formattedTime = formatDistanceToNow(parse(instruction.createdAt));

  return (
    <div className={classes.wrapper}>
      <div className={classes.duration}>
        <span>{`${formattedTime} ago`}</span>
      </div>
      <div>{instruction.contents[language]}</div>
    </div>
  );
}
