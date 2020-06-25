import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import store from './store';
import { api } from './api';
import AjaxError from './errors/AjaxError';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* handleAjaxError({ e }) {
  if (e instanceof AjaxError && e.httpErrorCode === 401) {
    yield put({ type: 'NOT_AUTHORIZED' });
  } else {
    yield put({ type: 'AJAX_ERROR', errorMessage: e.message });
  }
}

function* getHash() {
  yield put({ type: 'AJAX_START' });
  yield put({ type: 'GET_HASH_SILENTLY' });
  yield delay(10000);
  const ajax = yield select((state) => state.ajax);
  if (ajax.ajaxFailed !== false) yield put({ type: 'AJAX_END' });
}

function* getHashSilently({ data }) {
  try {
    yield put({ type: 'HASH_NOT_READY' });
    const [hash] = yield all([call(api.getHash, data)]);
    yield all([put({ type: 'HASH_RECEIVED', result: hash })]);
    yield put({ type: 'HASH_READY' });
    yield put({ type: 'AJAX_SUCCESS' });
  } catch (e) {
    yield put({ type: 'HANDLE_AJAX_ERROR', e });
  }
}

function* postSurvey() {
  yield put({ type: 'AJAX_START' });
  try {
    const answers = yield select((state) => state.answers);
    const hash = yield select((state) => state.hash);
    const geolocation = yield select((state) => state.geolocation);
    const language = yield select((state) => state.language);
    const result = yield all([call(api.postSurvey, { hash, answers, geolocation, language })]);
    // Hide spinner
    yield put({ type: 'AJAX_SUCCESS' });
  } catch (e) {
    yield put({ type: 'HANDLE_AJAX_ERROR', e });
  }
  yield delay(10000);
  const ajax = yield select((state) => state.ajax);
  if (ajax.ajaxFailed !== false) yield put({ type: 'AJAX_END' });
}

function* elementsLoad({ data }) {
  try {
    yield put({ type: 'ELEMENTS_NOT_READY' });
    const [elements] = yield all([call(api.getElements, data)]);
    yield all([put({ type: 'ELEMENTS_RECEIVED', result: elements })]);
    yield put({ type: 'ELEMENTS_READY' });
    yield put({ type: 'AJAX_SUCCESS' });
  } catch (e) {
    yield put({ type: 'HANDLE_AJAX_ERROR', e });
  }
}

function* questionsLoad({ data }) {
  yield put({ type: 'AJAX_START' });
  yield put({ type: 'QUESTIONS_LOAD_SILENTLY' });
  yield delay(10000);
  const ajax = yield select((state) => state.ajax);
  if (ajax.ajaxFailed !== false) yield put({ type: 'AJAX_END' });
}

function* questionsLoadSilently({ data }) {
  try {
    yield put({ type: 'DATA_NOT_READY' });
    const [questions] = yield all([call(api.getQuestions, data)]);
    yield all([
      put({ type: 'SET_DEFAULT_ANSWERS', result: questions.questions }),
      put({ type: 'QUESTIONS_RECEIVED', result: questions.questions }),
    ]);
    yield put({ type: 'DATA_READY' });
    yield put({ type: 'AJAX_SUCCESS' });
  } catch (e) {
    yield put({ type: 'HANDLE_AJAX_ERROR', e });
  }
}

function* instructionsLoad({ data }) {
  yield put({ type: 'AJAX_START' });
  yield put({ type: 'INSTRUCTIONS_LOAD_SILENTLY' });
  yield delay(10000);
  const ajax = yield select((state) => state.ajax);
  if (ajax.ajaxFailed !== false) yield put({ type: 'AJAX_END' });
}

function* instructionsLoadSilently({ data }) {
  try {
    const hash = yield select((state) => state.hash);
    yield put({ type: 'DATA_NOT_READY' });

    const useMock = process.env.REACT_APP_MOCK_INSTRUCTIONS === '1';

    console.log('useMock', useMock);

    const instructionsApi = useMock ? api.getInstructionsMock : api.getInstructions;

    const [data] = yield all([call(instructionsApi, { hash })]);
    yield all([
      put({ type: 'INSTRUCTIONS_RECEIVED', result: data.instructions }),
      put({ type: 'RESOURCES_RECEIVED', result: data.resources }),
      put({ type: 'DIAGNOSIS_RECEIVED', result: data.severity }),
    ]);
    yield put({ type: 'DATA_READY' });
    yield put({ type: 'AJAX_SUCCESS' });
  } catch (e) {
    yield put({ type: 'HANDLE_AJAX_ERROR', e });
  }
}

function* watchActions() {
  yield takeEvery('GET_HASH', getHash);
  yield takeEvery('GET_HASH_SILENTLY', getHashSilently);
  yield takeEvery('POST_SURVEY', postSurvey);
  yield takeEvery('ELEMENTS_LOAD', elementsLoad);
  yield takeEvery('QUESTIONS_LOAD', questionsLoad);
  yield takeEvery('QUESTIONS_LOAD_SILENTLY', questionsLoadSilently);
  yield takeEvery('INSTRUCTIONS_LOAD', instructionsLoad);
  yield takeEvery('INSTRUCTIONS_LOAD_SILENTLY', instructionsLoadSilently);
  yield takeEvery('HANDLE_AJAX_ERROR', handleAjaxError);
}

export function* rootSaga() {
  yield all([
    watchActions(),
    // Add more as needed
  ]);
}

export const action = (type, data = {}) => store.dispatch({ type, data });
