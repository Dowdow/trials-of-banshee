export const ADD_SOUND = 'ADD_SOUND';
export const EDIT_SOUND = 'EDIT_SOUND';
export const SET_SOUNDS = 'SET_SOUNDS';

export function addSound(sound) {
  return (dispatch) => dispatch({ type: ADD_SOUND, sound });
}

export function editSound(id, sound) {
  return (dispatch) => dispatch({ type: EDIT_SOUND, sound });
}

export function setSounds(sounds) {
  return (dispatch) => dispatch({ type: SET_SOUNDS, sounds });
}
