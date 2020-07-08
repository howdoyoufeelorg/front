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
        fontSize: ({ isMobile }) => {
          console.log('isMobile', isMobile);
          return isMobile ? 18 : 24
        },
        fontWeight: 600,
        height: ({ isMobile }) => (isMobile ? 45 : 60),
        lineHeight: ({ isMobile }) => (isMobile ? '41px' : '56px'),
        boxSizing: 'border-box',
        backgroundColor: ({ hasValue }) => {
          return !hasValue ? '#F4F5FF' : 'white';
        },
        border: `2px ${theme.blue} solid`,
        color: theme.blue,
        borderRadius: 4,
        paddingLeft: 12,
        paddingTop: 0,
        paddingBottom: 0,
        '@media (min-width: 320px)': {
          fontSize: 18,
        },
      },
      '& label': {
        fontWeight: 900,
        color: theme.textColor,
        fontSize: ({ isMobile }) => (isMobile ? 18 : 23),
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
