import { SET_WEAPONS } from '../actions/weapons';

export default function weapons(state = [], action = {}) {
  switch (action.type) {
    case SET_WEAPONS:
      return [...action.weapons];
    default:
      return state;
  }
}
