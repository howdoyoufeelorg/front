import * as URI from 'uri-js';
import get from 'lodash/get';
import has from 'lodash/has';
import mapValues from 'lodash/mapValues';
import AjaxError from './errors/AjaxError';

export const apiUrl = (path, query = '') => {
  let cau = URI.parse(process.env.REACT_APP_API_HOST);
  cau = Object.assign(cau, { path });
  if (query) {
    cau.query = query;
  }
  return URI.serialize(cau);
};

export const addAuthHeader = (headers = {}) => {
  return Object.assign(headers, {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
};

export const addAuthQueryParam = (query) => {
  query = query.match(/\?/) ? query + '&token=' : query + '?token=';
  return query + localStorage.getItem('token');
};

const normalize = (data) => {
  if (has(data, 'hydra:member')) {
    // Normalize items in collections
    data['hydra:member'] = data['hydra:member'].map((item) => normalize(item));

    return data;
  }

  // Flatten nested documents
  return mapValues(data, (value) =>
    Array.isArray(value) ? value.map((v) => get(v, '@id', v)) : get(value, '@id', value),
  );
};

const vkGet = (url, query = '') =>
  fetch(apiUrl(url, query), {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: addAuthHeader({
      'Content-Type': 'application/json; charset=utf-8',
    }),
    redirect: 'error', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
    .then((response) => {
      if (!response.ok) {
        throw new AjaxError(response.status, 'HTTP error, status = ' + response.status);
      }
      return response.json();
    })
    .then((json) => normalize(json));

const vkPost = (url, data) =>
  fetch(apiUrl(url), {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: addAuthHeader({
      'Content-Type': 'application/json; charset=utf-8',
    }),
    redirect: 'error', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => {
      if (!response.ok) {
        throw new AjaxError(response.status, 'HTTP error, status = ' + response.status);
      }
      return response.json();
    })
    .then((json) => normalize(json));

const vkPut = (url, data) =>
  fetch(apiUrl(url), {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: addAuthHeader({
      'Content-Type': 'application/json; charset=utf-8',
    }),
    redirect: 'error', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => {
      if (!response.ok) {
        throw new AjaxError(response.status, 'HTTP error, status = ' + response.status);
      }
      return response.json();
    })
    .then((json) => normalize(json));

const vkDelete = (url) =>
  fetch(apiUrl(url), {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: addAuthHeader({
      'Content-Type': 'application/json; charset=utf-8',
    }),
    redirect: 'error', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  }).then((response) => {
    if (!response.ok) {
      throw new AjaxError(response.status, 'HTTP error, status = ' + response.status);
    }
  });

const vkGetFile = (url) =>
  fetch(apiUrl(url), {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: addAuthHeader({
      'Content-Type': 'application/json; charset=utf-8',
    }),
    redirect: 'error', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  }).then((response) => {
    if (!response.ok) {
      throw new AjaxError(response.status, 'HTTP error, status = ' + response.status);
    }
    return response.text();
  });

export const api = {
  test: () => vkGet('/test'),
  getHash: () => vkGet('/get-hash'),
  postSurvey: (data) => vkPost('/post-survey', data),
  getElements: () => vkGet('/get-elements'),
  getQuestions: () => vkGet('/get-questions'),
  getInstructions: (data) => vkPost('/get-instructions', data),
  getInstructionsMock: (data) => {
    return Promise.resolve({
      instructions: [
        {
          createdBy: 'Test, Editor',
          createdAt: '2020-06-02T09:32:00+00:00',
          updatedAt: '2020-05-07T09:32:00+00:00',
          contents: {
            en: '78620 - Zipcode Instruction 1 LOW',
            es: '78620 - Código postal instrucción 1 LOW',
          },
          geoentity: 'zipcode',
        },
        {
          createdBy: 'Test, Editor',
          createdAt: '2020-05-07T09:32:00+00:00',
          updatedAt: '2020-05-07T09:32:00+00:00',
          contents: {
            en: '78620 - Zipcode Instruction 2 LOW',
            es: '78620 - Código postal instrucción 2 LOW',
          },
          geoentity: 'zipcode',
        },
        {
          createdBy: 'Test, Editor',
          createdAt: '2020-05-07T09:32:00+00:00',
          updatedAt: '2020-05-07T09:32:00+00:00',
          contents: {
            en: '48864 - Area Instruction 1 LOW',
            es: '48864 - Instrucción de área 1 LOW',
          },
          geoentity: 'area',
        },
        {
          createdBy: 'Test, Editor',
          createdAt: '2020-05-07T09:32:00+00:00',
          updatedAt: '2020-05-07T09:32:00+00:00',
          contents: {
            en: '48864 - Area Instruction 2 LOW',
            es: '48864 - Instrucción de área 2 LOW',
          },
          geoentity: 'area',
        },
        {
          createdBy: 'Test, Editor',
          createdAt: '2020-05-07T09:32:00+00:00',
          updatedAt: '2020-05-07T09:32:00+00:00',
          contents: {
            en: '48864 - State Instruction 1 LOW',
            es: '48864 - Instrucción estatal 1 LOW',
          },
          geoentity: 'state',
        },
        {
          createdBy: 'Test, Editor',
          createdAt: '2020-05-07T09:32:00+00:00',
          updatedAt: '2020-05-07T09:32:00+00:00',
          contents: {
            en: '48864 - State Instruction 2 LOW',
            es: '48864 - Instrucción estatal 2 LOW',
          },
          geoentity: 'state',
        },
      ],
      resources: {
        country: {
          webResources: [],
          twitterResources: [],
          officialWebResources: [],
          phoneNumbers: [],
        },
        state: {
          webResources: [],
          twitterResources: [
            {
              value: 'TexasDSHS',
              description: 'Texas official Twitter',
            },
          ],
          officialWebResources: [],
          phoneNumbers: [],
        },
        area: {
          webResources: [],
          twitterResources: [],
          officialWebResources: [],
          phoneNumbers: [],
        },
      },
      surveyId: 28,
      severity: 'high',
    });
  },
};
