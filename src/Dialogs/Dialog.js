//@flow
import * as React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export const styles = (theme: any) => ({
  paper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
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
    padding: 40,
  },
  actions: {
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

export const Dialog = ({ children, ...props }: { children: React.Node, ... }) => {
  const classes = useStyles();

  return (
    <MuiDialog
      open={true}
      fullWidth={true}
      maxWidth={'md'}
      disableBackdropClick
      classes={{ paper: classes.paper }}
      {...props}
    >
      {children}
    </MuiDialog>
  );
};

export const DialogTitle = ({
  children,
  displayProgress,
  progressCompleted,
  ...props
}: {
  children: React.Node,
  displayProgress?: boolean,
  progressCompleted?: number,
  ...
}) => {
  const classes = useStyles();

  return (
    <MuiDialogTitle classes={{ root: classes.titleRoot }} {...props}>
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
    </MuiDialogTitle>
  );
};

export const DialogContent = ({ children, ...props }: { children: React.Node, ... }) => {
  const classes = useStyles();

  return (
    <MuiDialogContent classes={{ root: classes.content }} {...props}>
      {children}
    </MuiDialogContent>
  );
};

export const DialogActions = ({ children, ...props }: { children: React.Node, ... }) => {
  const classes = useStyles();

  return (
    <MuiDialogActions classes={{ root: classes.actions }} {...props}>
      {children}
    </MuiDialogActions>
  );
};
