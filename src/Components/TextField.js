//@flow
import MUITextField from '@material-ui/core/TextField';
import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const HDYFTextField = withStyles((theme) => {
  console.log('theme', theme);

  return {
    root: {
      '& input, .MuiSelect-root': {
        border: `2px ${theme.blue} solid`,
        color: theme.blue,
        'border-radius': '4px',
        'padding-left': '12px',
      },
      '& label': {
        fontWeight: 900,
      },
      '& .Mui-focused input': {
        'box-shadow': '8px 8px 24px 0px rgba(86,133,247,0.5)',
      },
      '& .MuiInputLabel-formControl': {
        position: 'static',
        transform: 'none',
      },
      '& .MuiInput-root': {
        'margin-top': '8px',
      },
      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
        border: 'none',
      },
      '& .MuiInput-underline:hover:before': {
        border: 'none',
      },
    },
  };
})(MUITextField);

export const TextField = (props: any) => {
  return <HDYFTextField InputLabelProps={{ shrink: true }} {...props} />;
};
