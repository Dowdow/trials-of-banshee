export const SET_BOUNTIES = 'SET_BOUNTIES';
export const SET_CURRENT_BOUNTY = 'SET_CURRENT_BOUNTY';

export function setBounties(bounties) {
  return (dispatch) => dispatch({ type: SET_BOUNTIES, payload: bounties });
}

export function setCurrentBounty(id) {
  return (dispatch) => dispatch({ type: SET_CURRENT_BOUNTY, payload: id });
}
