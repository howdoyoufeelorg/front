import React, {useState, useEffect}  from 'react';
import classNames from 'classnames';
import {styles} from './App_Styles';
import {
    withStyles,
    CssBaseline,
    AppBar, Toolbar, IconButton, Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AjaxInProgressDialog from "./Dialogs/AjaxInProgressDialog";
import AjaxFailureDialog from "./Dialogs/AjaxFailureDialog";
import {action} from './sagas';
import {hot} from "react-hot-loader";
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import {Loading} from "./Components/Loading";
import {Survey} from "./Survey";

function App(props) {
    const hash = useSelector(state => state.hash);
    const questions = useSelector(state => state.questions);
    useEffect(() => {
            if (!hash) {
                action('GET_HASH');
            }
            action('QUESTIONS_LOAD');
        }, []);
    if (hash == null || questions === []) {
        return (<Loading/>)
    }
    const {classes} = props;
    return (
        <>
            <CssBaseline/>
            <AppBar
                position="fixed"
                color="secondary"
                elevation={0}
            >
                <Toolbar disableGutters={true}>
                    <Typography variant="h4" className={classes.title}>
                        How Do You Feel?
                    </Typography>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon fontSize={"2.5rem"} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.appWrapper}>
            </div>
            <Survey className={classes.Survey}/>
            <AjaxInProgressDialog/>
            <AjaxFailureDialog/>
        </>
    );
}

export default hot(module)(withStyles(styles)(App));