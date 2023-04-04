import { generatePath } from 'react-router-dom';
import { addCompletedBounty } from '../utils/localStorage';
import { ROUTES_API } from '../utils/routes';

export const SET_BOUNTIES = 'SET_BOUNTIES';
export const SET_COMPLETIONS = 'SET_COMPLETIONS';
export const SET_CURRENT_BOUNTY = 'SET_CURRENT_BOUNTY';
export const SET_POPUP_WEAPONS = 'SET_POPUP_WEAPONS';
export const UPDATE_BOUNTY = 'UPDATE_BOUNTY';

export function setBounties(bounties) {
  return (dispatch) => dispatch({ type: SET_BOUNTIES, payload: bounties });
}

export function setCompletions(completions) {
  return (dispatch) => dispatch({ type: SET_COMPLETIONS, payload: completions });
}

export function setCurrentBounty(id) {
  return (dispatch) => dispatch({ type: SET_CURRENT_BOUNTY, payload: id });
}

export function setPopupWeapons(show) {
  return (dispatch) => dispatch({ type: SET_POPUP_WEAPONS, payload: show });
}

export function updateBounty(bounty) {
  return (dispatch) => {
    addCompletedBounty(bounty.id, bounty.completed);
    dispatch({ type: UPDATE_BOUNTY, payload: bounty });
  };
}

export function getBountiesToday() {
  return (dispatch) => {
    fetch(ROUTES_API.BOUNTIES_TODAY)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setBounties(data.items));
        dispatch(setCompletions(data.completions));
      })
      .catch((err) => console.log(err));
  };
}

export function postClue(bountyId, clueType) {
  return (dispatch) => {
    fetch(generatePath(ROUTES_API.BOUNTY_CLUE, { id: bountyId }), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clueType }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(updateBounty(data)))
      .catch((err) => console.log(err));
  };
}

export function postGuess(bountyId, weaponId) {
  return (dispatch) => {
    fetch(generatePath(ROUTES_API.BOUNTY_GUESS, { id: bountyId }), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weaponId }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(updateBounty(data)))
      .catch((err) => console.log(err));
  };
}
