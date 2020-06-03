import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Slider as MaterialSlider } from '@material-ui/core';
import { action } from '../../sagas';
import SliderThumb from '../../assets/images/Mood_Chart_Dot.svg';
import { useIsMobile } from '../../Hooks/useIsMobile';
import { SmileyRow } from './SmileyRow';
import { ValueLabelComponent } from './ValueLabelComponent';
import Chevron from '../../assets/icons/Chevron_for_Button.svg';
import { ThumbSVG } from './ThumbSVG';
import clsx from 'clsx';

const useStyles = makeStyles({
  sliderWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  limit: {
    color: '#1168f6',
    fontSize: (props) => {
      console.log('props', props);
      return props.isMobile ? 24 : 37;
    },
    fontWeight: 900,
    marginTop: (props) => (props.isMobile ? 0 : -10),
    transition: '0.3s transform',
    transform: 'translateX(0)',
  },
  leftLimit: {
    marginRight: 14,
  },
  rightLimit: {
    marginLeft: 14,
    transform: (props) => {
      console.log('transform props', props.value, typeof props.value);
      return props.value === 10 ? 'translateX(10px)' : 'translateX(0)';
    },
  },
  questionTitle: {
    fontSize: '1.2rem',
    marginBottom: 10,
    textAlign: 'center',
  },
});

const size = '2x';

const HDYFSlider = (props) =>
  withStyles((theme) => ({
    root: {
      color: '#000000',
      height: 8,
    },
    thumb: {
      height: props.isMobile ? 45 : 58,
      width: props.isMobile ? 45 : 58,
      marginTop: props.isMobile ? -20 : -20,
      marginLeft: props.isMobile ? -20 : -31,
      backgroundColor: 'transparent',
      '&:focus, &:hover, &:active': {
        boxShadow: 'inherit',
      },
      '&.MuiSlider-active': {
        boxShadow: 'none',
      },
      '& > svg': {
        transform: 'scale(1)',
        transition: '0.3s transform',
      },
      '&.MuiSlider-active > svg': {
        transform: 'scale(1.2)',
      },
      '&:after': {
        content: 'unset',
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
  const value = props?.['aria-valuenow'];
  console.log('props inside thumb', typeof value);

  return (
    <ValueLabelComponent value={value}>
      <span {...props}>
        <ThumbSVG />
      </span>
    </ValueLabelComponent>
  );
}

export function Slider(props) {
  const { question } = props;
  const defaultValue = 6;

  const [value, setValue] = React.useState(defaultValue);
  const isMobile = useIsMobile();

  console.log('slider value', value);

  const classes = useStyles({ isMobile, value });

  const HDYFSliderWithProps = React.useMemo(() => HDYFSlider({ isMobile }), [isMobile]);

  return (
    <div className={classes.sliderWrapper}>
      <div className={clsx(classes.limit, classes.leftLimit)}>1</div>
      <div style={{ width: '100%' }}>
        <HDYFSliderWithProps
          min={1}
          max={10}
          defaultValue={defaultValue}
          track={false}
          ThumbComponent={HDYFThumbComponent}
          onChange={(event, value) => {
            setValue(value);
            action('ANSWER_SET', { questionId: question.id, data: { answer: value } });
          }}
        />
        <SmileyRow />
      </div>
      <div className={clsx(classes.limit, classes.rightLimit)}>10</div>
    </div>
  );
}
