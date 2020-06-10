//@flow
import { getWidth } from '../../styleUtils';
import { makeStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  return {
    root: {
      width: (props) => {
        console.log('props', props);
        return getWidth(props.width);
      },
      '& input, .MuiSelect-root': {
        fontSize: 18,
        fontWeight: 600,
        backgroundColor: ({ hasValue }) => {
          return !hasValue ? '#F4F5FF' : 'white';
        },
        border: `2px ${theme.blue} solid`,
        color: theme.blue,
        'border-radius': '4px',
        'padding-left': '12px',
      },
      '& label': {
        fontWeight: 900,
        color: theme.textColor,
        fontSize: 18,
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
      '&.MuiInput-underline:before, &.MuiInput-underline:after, &.MuiInput-underline:hover:not(.Mui-disabled):before': {
        border: 'none',
      },
      '& .MuiInput-underline:hover:before': {
        border: 'none',
      },
    },
    placeholder: {
      opacity: 0.42,
    },
  };
};
export const useStyles = makeStyles(styles);
