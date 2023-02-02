import { SET_CURRENT_BOUNTY, SET_BOUNTIES } from '../actions/bounties';

const init = { current: null, items: [] };

export default function bounties(state = init, action = {}) {
  switch (action.type) {
    case SET_BOUNTIES:
      return { ...state, items: [...action.payload] };
    case SET_CURRENT_BOUNTY:
      return { ...state, current: action.payload };
    default:
      return state;
  }
}
