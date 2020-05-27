import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { styles as buttonStyles } from '@material-ui/core/Button/Button';
import clsx from 'clsx';
import Chevron from '../assets/icons/Chevron_for_Button.svg';
import { inputBoxShadow } from '../styleUtils';

function capitalize(string) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof string !== 'string') {
      throw new Error('Material-UI: capitalize(string) expects a string argument.');
    }
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

const styles = (theme) => {
  const customisedStyles = {
    root: {
      color: theme.blue,
      backgroundColor: theme.white,
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 900,
      height: 40,
      width: 140,
      borderRadius: 5,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: theme.blue,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: theme.white,
      },
      '& img': {
        marginLeft: 15,
        marginTop: 2,
      },
    },
    sizeXSmall: {
      width: 80,
      height: 40,
    },
    sizeSmall: {
      width: 90,
      height: 40,
    },
    sizeRegular: {
      width: 110,
      height: 45,
    },
    sizeLarge: {
      width: 185,
      height: 45,
    },
    sizeExtraLarge: {
      width: 315,
      height: 45,
    },
    noShadow: {
      boxShadow: 'none',
    },
    default: {
      color: theme.white,
      backgroundColor: theme.blue,
      '&:hover': {
        backgroundColor: theme.blue,
      },
    },
    selected: {
      color: theme.white,
      backgroundColor: theme.blue,
      ...inputBoxShadow,
      '&:hover': {
        backgroundColor: theme.blue,
      },
    },
    buttonText: {
      lineHeight: '36px',
    },
  };
  const computed = { ...buttonStyles(theme), ...customisedStyles };
  return computed;
};

const useStyles = makeStyles(styles);

function BlueButton(props) {
  const classes = useStyles();
  const { variant, className, selected, size, children, ...rest } = props;
  const finalClassName = clsx(
    classes.root,
    classes[variant],
    selected && classes.selected,
    size !== undefined && size !== '' && classes['size'.concat(capitalize(size))],
    className,
  );
  return (
    <Button className={finalClassName} type="button" {...rest}>
      <span className="button-text">{children}</span>
      {variant === 'default' && <img src={Chevron} alt="chevron" />}
    </Button>
  );
}

export default BlueButton;
