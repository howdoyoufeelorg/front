import { createMuiTheme } from '@material-ui/core';
import LatoRegularWoff2 from './fonts/Lato-Regular.woff2';
import LatoBoldWoff2 from './fonts/Lato-Bold.woff2';
import LatoBlackWoff2 from './fonts/Lato-Black.woff2';

// Project colors
const none = 'none';
const white = '#ffffff';
const grey = '#eef0f5';
const grey2 = '#ecf0f3';
const blue = '#5685f7';
const purple = '#ef64d9';
const orange = '#ff973e';
const green = '#67e0ba';
const red = '#ef6464';
const blue2 = '#0667f6';
const blue3 = '#148df7';
const blue4 = '#00355a';
const textColor = '#333';

// Picked from the mockup
const backgroundBlue = '#4f7ff2';

const buttonBlueSelectedShadow = {
  boxShadow: '8px 8px 24px 0px rgba(86,133,247,0.75)',
  '-moz-box-shadow': '8px 8px 24px 0px rgba(86,133,247,0.75)',
  '-webkit-box-shadow': '8px 8px 24px 0px rgba(86,133,247,0.75)',
};
const buttonBlueNotSelectedShadow = {
  boxShadow: '8px 8px 24px 0px rgba(86,133,247,0.5)',
  '-moz-box-shadow': '8px 8px 24px 0px rgba(86,133,247,0.5)',
  '-webkit-box-shadow': '8px 8px 24px 0px rgba(86,133,247,0.5)',
  '&:hover': null,
};
const buttonGreyShadow = {
  boxShadow: '8px 8px 24px 0px rgba(166,180,200,0.7);',
  '-moz-box-shadow': '8px 8px 24px 0px rgba(166,180,200,0.7);',
  '-webkit-box-shadow': '8px 8px 24px 0px rgba(166,180,200,0.7);',
};

const lato = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: [[400, 500]],
  src: `
        local('Lato'),
        local('Lato-Regular'),
        url(${LatoRegularWoff2}) format('woff2')
    `,
};

const latoBold = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 800,
  src: `
        local('Lato'),
        local('Lato-Bold'),
        url(${LatoBoldWoff2}) format('woff2')
    `,
};

const latoBlack = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 900,
  src: `
        local('Lato'),
        local('Lato-Black'),
        url(${LatoBlackWoff2}) format('woff2')
    `,
};

export const theme = createMuiTheme({
  palette: {
    background: {
      default: grey2,
      paper: white,
    },
    primary: {
      main: 'rgb(0,0,0)',
    },
    secondary: {
      main: 'rgb(255,255,255)',
    },
    text: {
      primary: textColor,
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Lato',
      // 'Roboto',
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      // '"Helvetica Neue"',
      // 'Arial',
      // 'sans-serif',
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
    ].join(','),
  },
  MuiListItemIcon: {
    root: {
      minWidth: 'initial',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [lato, latoBold, latoBlack],
      },
    },
  },
  white,
  grey,
  grey2,
  blue,
  purple,
  orange,
  green,
  red,
  blue2,
  blue3,
  blue4,
  backgroundBlue, textColor,
  globalRadius: 10,
  appBarHeightMobile: 56,
  appBarHeightDesktop: 64,
  actionBarHeightMobile: 80,
  inputControlWidth: '200px',
});
