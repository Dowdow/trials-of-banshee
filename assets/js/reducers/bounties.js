import { SET_CURRENT_BOUNTY, SET_BOUNTIES, UPDATE_BOUNTY, SET_COMPLETIONS } from '../actions/bounties';

const init = { current: null, items: [], completions: 0 };

export default function bounties(state = init, action = {}) {
  switch (action.type) {
    case SET_BOUNTIES:
      return { ...state, items: [...action.payload] };
    case SET_COMPLETIONS:
      return { ...state, completions: action.payload };
    case SET_CURRENT_BOUNTY:
      return { ...state, current: action.payload };
    case UPDATE_BOUNTY: {
      const indexBounty = state.items.findIndex((b) => b.id === action.payload.id);
      if (indexBounty !== -1) {
        state.items.splice(indexBounty, 1);
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        completions: state.completions + 1,
      };
    }
    default:
      return state;
  }
}
