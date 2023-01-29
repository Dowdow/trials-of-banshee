import { ADD_SOUND, EDIT_SOUND, SET_SOUNDS } from '../actions/sounds';

export default function sounds(state = [], action = {}) {
  switch (action.type) {
    case ADD_SOUND:
      return [...state, action.sound];
    case EDIT_SOUND:
      return [...state.filter((s) => s.id !== action.sound.id), action.sound];
    case SET_SOUNDS:
      return [...action.sounds];
    default:
      return state;
  }
}
