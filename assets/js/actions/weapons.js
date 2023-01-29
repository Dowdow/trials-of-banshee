export const SET_WEAPONS = 'SET_WEAPONS';

export function setWeapons(weapons) {
  return (dispatch) => dispatch({ type: SET_WEAPONS, weapons });
}
