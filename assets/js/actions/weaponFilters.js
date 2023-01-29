export const SET_WEAPON_FILTERS_DAMAGE_TYPE = 'SET_WEAPON_FILTERS_DAMAGE_TYPE';
export const SET_WEAPON_FILTERS_HAS_SOUND = 'SET_WEAPON_FILTERS_HAS_SOUND';
export const SET_WEAPON_FILTERS_QUERY = 'SET_WEAPON_FILTERS_QUERY';
export const SET_WEAPON_FILTERS_RARITY = 'SET_WEAPON_FILTERS_RARITY';
export const SET_WEAPON_FILTERS_TYPE = 'SET_WEAPON_FILTERS_TYPE';

export function setDamageType(damageType) {
  return (dispatch) => dispatch({ type: SET_WEAPON_FILTERS_DAMAGE_TYPE, payload: damageType });
}

export function setHasSound(hasSound) {
  return (dispatch) => dispatch({ type: SET_WEAPON_FILTERS_HAS_SOUND, payload: hasSound });
}

export function setQuery(query) {
  return (dispatch) => dispatch({ type: SET_WEAPON_FILTERS_QUERY, payload: query });
}

export function setRarity(rarity) {
  return (dispatch) => dispatch({ type: SET_WEAPON_FILTERS_RARITY, payload: rarity });
}

export function setType(type) {
  return (dispatch) => dispatch({ type: SET_WEAPON_FILTERS_TYPE, payload: type });
}
