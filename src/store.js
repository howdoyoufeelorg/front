import {applyMiddleware, compose, createStore} from 'redux'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./sagas";

const preloadedState = {};
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]; // In case you need more middleware, add it here
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer]; // In case you need non-middleware enhancer, add it here

const enhancedCompose = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
    }) : compose;

const composedEnhancers = enhancedCompose(...enhancers);

const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancers
);


sagaMiddleware.run(rootSaga);

export default store;
