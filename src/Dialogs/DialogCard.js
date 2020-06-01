//@flow
import * as React from 'react';
import MuiCard from '@material-ui/core/Card';
import MuiDialogContent from '@material-ui/core/CardContent';
import MuiDialogActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ProgressBar } from '../Components/ProgressBar';

export const styles = (theme: any) => ({
  paper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: `calc(100vw - 96px)`,
    margin: 48,
    boxShadow: '0 3px 60px 0 rgba(0, 0, 0, 0.16)',
    paddingBottom: 40,
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
    fontSize: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 52,
    '& button:nth-of-type(2)': {
      marginLeft: 20,
    },
  },
  progressRoot: {
    height: 6,
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
      {displayProgress && progressCompleted && (
        <ProgressBar progressCompleted={progressCompleted} />
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
