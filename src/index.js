import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider} from "@material-ui/core";
import {BrowserRouter as Router} from "react-router-dom";
import {theme} from './theme';
import { Provider } from 'react-redux'
import store from './store'
import 'react-flags-select/css/react-flags-select.css';

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
