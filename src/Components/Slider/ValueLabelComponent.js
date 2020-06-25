// @flow
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIsMobile } from '../../Hooks/useIsMobile';
import Tooltip from '@material-ui/core/Tooltip';

const useStylesTooltip = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: 'transparent',
    color: theme.backgroundBlue,
    fontSize: (props) => (props.isMobile ? 34 : 44),
    fontWeight: 900,
    marginTop: 0,
    padding: [[2, 8]],
    lineHeight: 1,
    marginBottom: 4,
  },
  popper: {
    zIndex: 1,
  },
}));

const FakeTransitionComponent = ({ children }) => children;

export function ValueLabelComponent(props: { children: React.Node, value: number }) {
  const { children, value } = props;
  const { isMobile } = useIsMobile();

  const classes = useStylesTooltip({ isMobile });

  const open = React.useMemo(() => value !== 1 && value !== 10, [value]);

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
      TransitionComponent={FakeTransitionComponent}
      classes={{ tooltip: classes.tooltip, popper: classes.popper }}
    >
      {children}
    </Tooltip>
  );
}
