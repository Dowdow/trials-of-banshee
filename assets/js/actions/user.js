import { generatePath } from 'react-router-dom';
import { ROUTES_API } from '../utils/routes';

export const SET_USER = 'SET_USER';
export const SET_USER_COLLECTIONS = 'SET_USER_COLLECTIONS';
export const SET_USER_ERROR = 'SET_USER_ERROR';
export const SET_USER_TRIUMPHS = 'SET_USER_TRIUMPHS';

export function setUser(user) {
  return (dispatch) => dispatch({ type: SET_USER, payload: user });
}

export function setUserCollections(collections) {
  return (dispatch) => dispatch({ type: SET_USER_TRIUMPHS, payload: collections });
}

export function setUserError(error) {
  return (dispatch) => dispatch({ type: SET_USER_ERROR, payload: error });
}

export function setUserTriumphs(triumphs) {
  return (dispatch) => dispatch({ type: SET_USER_TRIUMPHS, payload: triumphs });
}

export function getUser() {
  return async (dispatch) => {
    try {
      const response = await fetch(ROUTES_API.USER, { method: 'GET' });
      const data = await response.json();
      if (response.status === 419 || response.status === 503) {
        dispatch(setUserError(data.errors));
      } else {
        dispatch(setUserError(null));
        dispatch(setUser(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserCollections() {
  return async (dispatch) => {
    try {
      const response = await fetch(ROUTES_API.COLLECTIONS, { method: 'GET' });
      const data = await response.json();
      dispatch(setUserCollections(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserTriumphs() {
  return async (dispatch) => {
    try {
      const response = await fetch(ROUTES_API.TRIUMPHS, { method: 'GET' });
      const data = await response.json();
      dispatch(setUserTriumphs(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function claimTriumph(triumph) {
  return async (dispatch) => {
    try {
      const response = await fetch(generatePath(ROUTES_API.TRIUMPH_CLAIM, { type: triumph }), { method: 'POST' });
      const data = await response.json();
      dispatch(setUserTriumphs(data));
    } catch (err) {
      console.log(err);
    }
  };
}
