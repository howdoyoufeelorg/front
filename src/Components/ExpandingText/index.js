//@flow
import * as React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = (theme: any) => ({
  textContent: {
    fontSize: 18,
    fontWeight: 'bold',
    maxHeight: 240,
    overflow: 'hidden',
    position: 'relative',
  },
  textExpanded: {
    maxHeight: 'none',
    '&:before': {
      content: 'unset',
    },
  },
  showMoreButton: {
    color: theme.blue,
    fontWeight: 900,
    fontSize: 18,
    padding: 0,
    marginTop: 14,
  },
});
const useStyles = makeStyles(styles);

export const ExpandingText = ({ children }: { children: React.Node }) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const textClasses = clsx(classes.textContent, isExpanded ? classes.textExpanded : null);
  return (
    <React.Fragment>
      <div className={textClasses}>{children}</div>
      <Button className={classes.showMoreButton} onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Read less' : 'Read more'}
      </Button>
    </React.Fragment>
  );
};
