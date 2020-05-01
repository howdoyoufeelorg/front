import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form'

import {elements} from '../translations';

const initialState = {
    hash: localStorage.getItem('hdyf_hash'),
    language: 'en',
    geolocation: {
        latitude: null,
        longitude: null
    },
    questions: [],
    answers: {
        country: {value: 'US'},
        zipcode: {value: ''}
    },
    instructions: [],
    resources: {},
    ajax: {
        ajaxInProgress: false,
        ajaxFailed: false,
        ajaxError: '',
    },
    dialogs: {
        someDialogOpen: false,
    },
    error: {},
    dataReady: false,
    hashReady: false,
    elementsReady: false,
    elements: elements
};

const hashReducer = (state = initialState.hash, action) => {
    switch(action.type) {
        case 'HASH_RECEIVED':
            const {hash} = action.result;
            localStorage.setItem('hdyf_hash', hash);
            return hash;
        default:
            return state;
    }
};

const languageReducer = (state = initialState.language, action) => {
    switch(action.type) {
        case 'LANGUAGE_SET':
            let {language} = action.data;
            switch(language) {
                case 'US': language = 'en'; break;
                case 'ES': language = 'es'; break;
            }
            return language;
        default:
            return state;
    }
};

const geolocationReducer = (state = initialState.geolocation, action) => {
    switch(action.type) {
        case 'GEOLOCATION_SET':
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

const questionsReducer = (state = initialState.questions, action) => {
    switch(action.type) {
        case 'QUESTIONS_RECEIVED':
            return action.result;
        default:
            return state;
    }
};

const answersReducer = (state = initialState.answers, action) => {
    switch(action.type) {
        case 'SET_DEFAULT_ANSWERS':
            const defaultAnswers = {};
            const questions = action.result;
            questions.forEach((question) => {
                if (question.type === 'slider') {
                    Object.assign(defaultAnswers, {[question.id] : {answer: 6}})
                }
            });
            return Object.assign({}, state, defaultAnswers);
        case 'SET_LOCATION':
            return state;
        case 'ANSWER_SET':
            const {questionId, data} = action.data;
            const newData = Object.assign({}, state[questionId], data);
            return Object.assign({}, state, {[questionId] : newData});
        default:
            return state;
    }
};

const instructionsReducer = (state = initialState.instructions, action) => {
    switch(action.type) {
        case 'INSTRUCTIONS_RECEIVED':
            return action.result;
        default:
            return state;
    }
};

const resourcesReducer = (state = initialState.resources, action) => {
    switch(action.type) {
        case 'RESOURCES_RECEIVED':
            return Object.assign({}, state, action.result);
        default:
            return state;
    }
};

const ajaxReducer = (state = initialState.ajax, action) => {
    switch(action.type) {
        case 'AJAX_START':
            return Object.assign({}, state, initialState.ajax, {ajaxInProgress: true});
        case 'AJAX_SUCCESS':
            return Object.assign({}, initialState.ajax);
        case 'AJAX_ERROR':
            return Object.assign({}, state, {ajaxInProgress: false, ajaxFailed: true, ajaxError: action.errorMessage ? action.errorMessage : 'UNKNOWN ERROR'});
        case 'AJAX_END':
            return Object.assign({}, initialState.ajax);
        default:
            return state;
    }
};

const dialogsReducer = (state = initialState.dialogs, action) => {
    switch(action.type) {
        case 'SOME_DIALOG':
            return Object.assign({}, state, {someDialogOpen: true});
        default:
            return state;
    }
};

const errorReducer = (state = initialState.error, action) => {
    switch(action.type) {
        case 'ERROR_SET':
            return action.error;
        case 'ERROR_CLEAR':
            return {};
        default:
            return state;
    }
};

const dataReadyReducer = (state = initialState.dataReady, action) => {
    switch(action.type) {
        case 'DATA_READY':
            return true;
        case 'DATA_NOT_READY':
            return false;
        default:
            return state;
    }
};

const hashReadyReducer = (state = initialState.hashReady, action) => {
    switch(action.type) {
        case 'HASH_READY':
            return true;
        case 'HASH_NOT_READY':
            return false;
        default:
            return state;
    }
};

// Not being used at the moment - the element translations are hardcoded into the app (see translations.js)
const elementsReadyReducer = (state = initialState.elementsReady, action) => {
    switch(action.type) {
        case 'ELEMENTS_READY':
            return true;
        case 'ELEMENTS_NOT_READY':
            return false;
        default:
            return state;
    }
};

// Not being used at the moment - the element translations are hardcoded into the app (see translations.js)
const elementsReducer = (state = initialState.elements, action) => {
    switch(action.type) {
        case 'ELEMENTS_RECEIVED':
            return action.result;
        default:
            return state;
    }
};

export default combineReducers({
    form: formReducer,
    hash: hashReducer,
    language: languageReducer,
    geolocation: geolocationReducer,
    questions: questionsReducer,
    answers: answersReducer,
    instructions: instructionsReducer,
    resources: resourcesReducer,
    ajax: ajaxReducer,
    dialogs: dialogsReducer,
    error: errorReducer,
    dataReady: dataReadyReducer,
    hashReady: hashReadyReducer,
    elementsReady: elementsReadyReducer,
    elements: elementsReducer,
});