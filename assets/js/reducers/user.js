import { SET_USER, SET_USER_COLLECTIONS, SET_USER_TRIUMPHS } from '../actions/user';

const init = { admin: false, authenticated: false };

export default function user(state = init, action = {}) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    case SET_USER_COLLECTIONS:
      return { ...state, collections: action.payload };
    case SET_USER_TRIUMPHS:
      return { ...state, triumphs: action.payload };
    default:
      return state;
  }
}
