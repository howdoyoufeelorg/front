import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Slider as MaterialSlider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { action } from '../sagas';
import { EmojiFrownIcon, EmojiGrinIcon, EmojiMehIcon, EmojiSmileIcon } from '../icons';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  sliderWrapper: {
    width: '100%',
  },
  questionTitle: {
    fontSize: '1.2rem',
    marginBottom: 10,
    textAlign: 'center',
  },
});

const size = '2x';

const marks = [
  {
    value: 1,
    label: <EmojiFrownIcon size={size} color="blue" />,
  },
  {
    value: 4,
    label: <EmojiMehIcon size={size} color="blue" />,
  },
  {
    value: 7,
    label: <EmojiSmileIcon size={size} color="blue" />,
  },
  {
    value: 10,
    label: <EmojiGrinIcon size={size} color="blue" />,
  },
];

const HDYFSlider = withStyles((theme) => ({
  root: {
    color: '#000000',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '4px solid',
    borderColor: theme.backgroundBlue,
    marginTop: -8,
    marginLeft: -11,
    '&:focus, &:hover, &:active': {
      boxShadow: 'inherit',
    },
    '&::after': {
      content: 'a',
    },
  },
  markLabel: {
    top: 'auto',
    bottom: 40,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.backgroundBlue,
  },
  rail: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.backgroundBlue,
  },
  mark: {
    opacity: 0,
  },
}))(MaterialSlider);

function HDYFThumbComponent(props) {
  console.log('props', props);
  return (
    <span {...props}>
      <span className="circle" />
    </span>
  );
}

const useStylesTooltip = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: 'transparent',
    color: theme.backgroundBlue,
    fontSize: 34,
    fontWeight: 900,
    marginTop: 0,
    padding: [[2, 8]],
    lineHeight: 1,
  },
  popper: {
    zIndex: 1,
  },
}));

function ValueLabelComponent(props: Props) {
  const { children, open, value } = props;
  const classes = useStylesTooltip();

  return (
    <Tooltip
      open={true}
      enterTouchDelay={0}
      placement="bottom"
      title={value}
      classes={{ tooltip: classes.tooltip, popper: classes.popper }}
    >
      {children}
    </Tooltip>
  );
}

export function Slider(props) {
  const { question } = props;
  const language = useSelector((state) => state.language);
  const classes = useStyles();
  const defaultValue = 6;
  return (
    <div className={classes.sliderWrapper}>
      <HDYFSlider
        min={1}
        max={10}
        defaultValue={defaultValue}
        valueLabelDisplay="on"
        ValueLabelComponent={ValueLabelComponent}
        marks={marks}
        onChange={(event, value) =>
          action('ANSWER_SET', { questionId: question.id, data: { answer: value } })
        }
      />
    </div>
  );
}
