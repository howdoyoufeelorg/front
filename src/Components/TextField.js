//@flow
import MUITextField from '@material-ui/core/TextField';
import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { getWidth } from '../styleUtils';

const HDYFTextField = ({ width }) =>
  withStyles((theme) => {
    console.log('Textfield props', getWidth(width));

    return {
      root: {
        width: getWidth(width),
        '& input, .MuiSelect-root': {
          border: `2px ${theme.blue} solid`,
          color: theme.blue,
          'border-radius': '4px',
          'padding-left': '12px',
        },
        '& label': {
          fontWeight: 900,
          color: theme.textColor,
        },
        '& .Mui-focused input, .Mui-focused .MuiSelect-root ': {
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
  const { width, ...textProps } = props;
  const TextFieldWithProps = React.useMemo(() => HDYFTextField({ width }), [width]);
  return <TextFieldWithProps InputLabelProps={{ shrink: true }} {...textProps} />;
};
