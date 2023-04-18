import { SET_SOUND_FILTERS_QUERY, SET_SOUND_FILTERS_TYPE } from '../actions/soundFilters';

const init = { query: '', type: 0 };

export default function soundFilter(state = init, action = {}) {
  switch (action.type) {
    case SET_SOUND_FILTERS_QUERY:
      return { ...state, query: action.payload };
    case SET_SOUND_FILTERS_TYPE:
      return { ...state, type: action.payload };
    default:
      return state;
  }
}
