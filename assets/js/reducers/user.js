import { SET_USER } from '../actions/user';

const init = { admin: false, authenticated: false };

export default function user(state = init, action = {}) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
