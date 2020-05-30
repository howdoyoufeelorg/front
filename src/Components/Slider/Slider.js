import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Slider as MaterialSlider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { action } from '../../sagas';
import { EmojiFrownIcon, EmojiGrinIcon, EmojiMehIcon, EmojiSmileIcon } from '../../icons';
import Tooltip from '@material-ui/core/Tooltip';
import { useIsMobile } from '../../Hooks/useIsMobile';
import { SmileyRow } from './SmileyRow';

const useStyles = makeStyles({
  sliderWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  limit: {
    color: '#1168f6',
    fontSize: (props) => (props.isMobile ? 24 : 37),
    fontWeight: 900,
    marginTop: (props) => (props.isMobile ? 0 : -10),
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

const HDYFSlider = (props) =>
  withStyles((theme) => ({
    root: {
      color: '#000000',
      height: 8,
    },
    thumb: {
      height: props.isMobile ? 30 : 40,
      width: props.isMobile ? 30 : 40,
      backgroundColor: '#fff',
      border: '4px solid',
      borderColor: theme.backgroundBlue,
      marginTop: props.isMobile ? -12 : -16,
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
      height: 6,
      borderRadius: 3,
      background: 'linear-gradient(to right, #70adf4, #1168f6)',
      opacity: 1,
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

function ValueLabelComponent(props: Props) {
  const { children, open, value } = props;
  const isMobile = useIsMobile();

  const classes = useStylesTooltip({ isMobile });

  return (
    <Tooltip
      open={true}
      enterTouchDelay={0}
      placement="top"
      title={value}
      classes={{ tooltip: classes.tooltip, popper: classes.popper }}
    >
      {children}
    </Tooltip>
  );
}

export function Slider(props) {
  const { question } = props;
  const isMobile = useIsMobile();
  const language = useSelector((state) => state.language);
  const classes = useStyles({ isMobile });
  const defaultValue = 6;

  const HDYFSliderWithProps = React.useMemo(() => HDYFSlider({ isMobile }), [isMobile]);

  return (
    <div className={classes.sliderWrapper}>
      <div className={classes.limit} style={{ marginRight: 4 }}>
        1
      </div>
      <div style={{ width: '100%' }}>
        <HDYFSliderWithProps
          min={1}
          max={10}
          defaultValue={defaultValue}
          valueLabelDisplay="on"
          ValueLabelComponent={ValueLabelComponent}
          track={false}
          /*marks={marks}*/
          onChange={(event, value) =>
            action('ANSWER_SET', { questionId: question.id, data: { answer: value } })
          }
        />
        <SmileyRow />
      </div>
      <div className={classes.limit} style={{ marginLeft: 4 }}>
        10
      </div>
    </div>
  );
}
