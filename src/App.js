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
import './faIcons';
import {Loading} from "./Components/Loading";
import {Survey} from "./Survey";
import {Disclaimer} from "./Disclaimer";
import {Emergency} from "./Emergency";
import {Instructions} from "./Instructions";
import {Call911} from "./Call911";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1Ijoidmtvc3QiLCJhIjoiY2s4and4M3pwMDAxZzNybW42Y25ieGc0cCJ9.f6HBCu8LQjhxik2EN7E4pg'
});

const getGeolocation = () => {
    if(navigator.geolocation) {
        function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
            action('GEOLOCATION_SET', {latitude, longitude});
        }
        function error() {}
        navigator.geolocation.getCurrentPosition(success, error);
    }
};

getGeolocation();

function App(props) {
    const {classes} = props;
    const hash = useSelector(state => state.hash);
    const questions = useSelector(state => state.questions);

    const [stage, setStage] = useState(0);
    const renderStage = (stage) => {
        switch(stage) {
            case 0: return <Disclaimer onClose={() => setStage(1)}/>;
            case 1: return <Emergency onClose={(response) => response === true ? setStage(9) : setStage(2)}/>;
            case 2: return <Survey onClose={() => setStage(3)}/>;
            case 3: return <Instructions />;
            case 9: return <Call911 />;
        }
    };

    useEffect(() => {
            if (!hash) {
                action('GET_HASH');
            }
            action('QUESTIONS_LOAD');
        }, []);

    if (hash == null || questions === []) {
        return (<Loading/>)
    }

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
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: '100vh',
                        width: '100vw'
                    }}
                    center={[0,0]}
                    zoom={[1]}
                >
                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                    </Layer>
                </Map>;
            </div>
            { renderStage(stage) }
            <AjaxInProgressDialog/>
            <AjaxFailureDialog/>
        </>
    );
}

export default hot(module)(withStyles(styles)(App));