export const SET_TOOLTIP_DATA = 'SET_TOOLTIP_DATA';
export const RESET_TOOLTIP = 'RESET_TOOLTIP';

export function setTooltip(header, content, connected = false) {
  return (dispatch) => dispatch({ type: SET_TOOLTIP_DATA, payload: { header, content, connected } });
}

export function resetTooltip() {
  return (dispatch) => dispatch({ type: RESET_TOOLTIP });
}
