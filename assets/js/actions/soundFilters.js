export const SET_SOUND_FILTERS_QUERY = 'SET_SOUND_FILTERS_QUERY';
export const SET_SOUND_FILTERS_TYPE = 'SET_SOUND_FILTERS_TYPE';

export function setQuery(query) {
  return (dispatch) => dispatch({ type: SET_SOUND_FILTERS_QUERY, payload: query });
}

export function setType(type) {
  return (dispatch) => dispatch({ type: SET_SOUND_FILTERS_TYPE, payload: type });
}
