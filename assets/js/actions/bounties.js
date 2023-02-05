import { addCompletedBounty } from '../utils/localStorage';

export const SET_BOUNTIES = 'SET_BOUNTIES';
export const SET_CURRENT_BOUNTY = 'SET_CURRENT_BOUNTY';
export const UPDATE_BOUNTY = 'UPDATE_BOUNTY';

export function setBounties(bounties) {
  return (dispatch) => dispatch({ type: SET_BOUNTIES, payload: bounties });
}

export function setCurrentBounty(id) {
  return (dispatch) => dispatch({ type: SET_CURRENT_BOUNTY, payload: id });
}

export function updateBounty(bounty) {
  return (dispatch) => {
    addCompletedBounty(bounty.id, bounty.completed);
    dispatch({ type: UPDATE_BOUNTY, payload: bounty });
  };
}
