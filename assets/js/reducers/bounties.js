import { SET_CURRENT_BOUNTY, SET_BOUNTIES, UPDATE_BOUNTY } from '../actions/bounties';

const init = { current: null, items: [] };

export default function bounties(state = init, action = {}) {
  switch (action.type) {
    case SET_BOUNTIES:
      return { ...state, items: [...action.payload] };
    case SET_CURRENT_BOUNTY:
      return { ...state, current: action.payload };
    case UPDATE_BOUNTY: {
      const indexBounty = state.items.findIndex((b) => b.id === action.payload.id);
      if (indexBounty !== -1) {
        state.items.splice(indexBounty, 1);
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    default:
      return state;
  }
}
