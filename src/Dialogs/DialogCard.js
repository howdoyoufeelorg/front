//@flow
import * as React from 'react';
import MuiCard from '@material-ui/core/Card';
import MuiDialogContent from '@material-ui/core/CardContent';
import MuiDialogActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export const styles = (theme: any) => ({
  paper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: `calc(100vw - 96px)`,
    margin: 48,
  },
  titleRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 0,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: [[16, 24]],
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: [[20, 20]],
  },
  progressColorPrimary: {
    backgroundColor: '#a7a7a7',
  },
  progressBarColorPrimary: {
    backgroundColor: theme.blue,
  },
});
const useStyles = makeStyles(styles);

export const DialogCard = ({ children, ...props }: { children: React.Node, ... }) => {
  const classes = useStyles();

  return (
    <MuiCard classes={{ root: classes.paper }} {...props}>
      {children}
    </MuiCard>
  );
};

export const DialogCardHeader = ({
  children,
  displayProgress,
  progressCompleted,
}: {
  children: React.Node,
  displayProgress?: boolean,
  progressCompleted?: number,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.titleRoot}>
      {displayProgress && (
        <LinearProgress
          value={progressCompleted}
          variant="determinate"
          classes={{
            barColorPrimary: classes.progressBarColorPrimary,
            colorPrimary: classes.progressColorPrimary,
          }}
        />
      )}
      <div className={classes.title}>{children}</div>
    </div>
  );
};

export const DialogCardContent = ({ children, ...props }: { children: React.Node, ... }) => {
  const classes = useStyles();

  return (
    <MuiDialogContent classes={{ root: classes.content }} {...props}>
      {children}
    </MuiDialogContent>
  );
};

export const DialogCardActions = ({ children, ...props }: { children: React.Node, ... }) => {
  const classes = useStyles();

  return (
    <MuiDialogActions classes={{ root: classes.actions }} {...props}>
      {children}
    </MuiDialogActions>
  );
};
