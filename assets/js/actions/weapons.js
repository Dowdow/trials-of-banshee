import { ROUTES_API } from '../utils/routes';

export const SET_WEAPONS = 'SET_WEAPONS';

export function setWeapons(weapons) {
  return (dispatch) => dispatch({ type: SET_WEAPONS, weapons });
}

export function getWeapons() {
  return (dispatch) => {
    fetch(ROUTES_API.WEAPONS)
      .then((res) => res.json())
      .then((data) => dispatch(setWeapons(data.items)))
      .catch((err) => console.log(err));
  };
}
