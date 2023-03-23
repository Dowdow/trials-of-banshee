import { generatePath } from 'react-router-dom';
import { ROUTES_API } from '../utils/routes';

export const SET_USER = 'SET_USER';
export const SET_USER_COLLECTIONS = 'SET_USER_COLLECTIONS';
export const SET_USER_TRIUMPHS = 'SET_USER_TRIUMPHS';

export function setUser(user) {
  return (dispatch) => dispatch({ type: SET_USER, payload: user });
}

export function setUserCollections(collections) {
  return (dispatch) => dispatch({ type: SET_USER_TRIUMPHS, payload: collections });
}

export function setUserTriumphs(triumphs) {
  return (dispatch) => dispatch({ type: SET_USER_TRIUMPHS, payload: triumphs });
}

export function getUserCollections() {
  return (dispatch) => {
    fetch(generatePath(ROUTES_API.COLLECTIONS), { method: 'GET' })
      .then((response) => response.json())
      .then((data) => dispatch(setUserCollections(data)))
      .catch((err) => console.log(err));
  };
}

export function getUserTriumphs() {
  return (dispatch) => {
    fetch(generatePath(ROUTES_API.TRIUMPHS), { method: 'GET' })
      .then((response) => response.json())
      .then((data) => dispatch(setUserTriumphs(data)))
      .catch((err) => console.log(err));
  };
}

export function claimTriumph(triumph) {
  return (dispatch) => {
    fetch(generatePath(ROUTES_API.TRIUMPH_CLAIM, { type: triumph }), { method: 'POST' })
      .then((response) => response.json())
      .then((data) => dispatch(setUserTriumphs(data)))
      .catch((err) => console.log(err));
  };
}
