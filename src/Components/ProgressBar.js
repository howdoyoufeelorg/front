//@flow
import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

export const styles = (theme: any) => ({
  progressRoot: {
    height: 6,
    width: '100%',
  },
  progressColorPrimary: {
    backgroundColor: '#a7a7a7',
  },
  progressBarColorPrimary: {
    backgroundColor: theme.blue,
  },
});
const useStyles = makeStyles(styles);

export const ProgressBar = ({ progressCompleted }: { progressCompleted: number }) => {
  const classes = useStyles();

  return (
    <LinearProgress
      value={progressCompleted}
      variant="determinate"
      classes={{
        root: classes.progressRoot,
        barColorPrimary: classes.progressBarColorPrimary,
        colorPrimary: classes.progressColorPrimary,
      }}
    />
  );
};
