import { generatePath } from 'react-router-dom';
import { ROUTES_API } from '../utils/routes';

export const ADD_SOUND = 'ADD_SOUND';
export const EDIT_SOUND = 'EDIT_SOUND';
export const SET_SOUNDS = 'SET_SOUNDS';

export function addSound(sound) {
  return (dispatch) => dispatch({ type: ADD_SOUND, sound });
}

export function editSound(sound) {
  return (dispatch) => dispatch({ type: EDIT_SOUND, sound });
}

export function setSounds(sounds) {
  return (dispatch) => dispatch({ type: SET_SOUNDS, sounds });
}

export function getSounds() {
  return (dispatch) => {
    fetch(ROUTES_API.SOUNDS)
      .then((res) => res.json())
      .then((data) => dispatch(setSounds(data.items)))
      .catch((err) => console.log(err));
  };
}

export function getSoundId(id) {
  return (dispatch) => {
    fetch(generatePath(ROUTES_API.SOUND, { id }))
      .then((response) => response.json())
      .then((data) => dispatch(addSound(data)))
      .catch((err) => console.log(err));
  };
}
