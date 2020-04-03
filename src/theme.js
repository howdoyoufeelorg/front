import {createMuiTheme} from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        background: {
            default: 'white'
        },
        primary: {
            main: 'rgb(0,0,0)'
        },
        secondary: {
            main: 'rgb(255,255,255)'
        }
    },
    typography: {
        useNextVariants: true,
    },
    MuiListItemIcon: {
        root: {
            minWidth: 'initial',
        },
    },
    thinBorder: '1px solid rgba(0, 0, 0, 0.12)',
    thinBorderWhite: '1px solid rgba(255, 255, 255, 0.87)',
    dashedBorderGrey: '1px dashed #7F7F7F',
    yellow: '#fac724',
    paleRed: '#FF7675',
    grey: '#4a4c4c',
    lightGrey: '#f7f7f7',
    loginGrey: '#56585A',
    contextMenuGrey: 'rgb(209,209,209)',
    globalRadius: 12,
    appBarHeight: 64,
});