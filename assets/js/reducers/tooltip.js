import { RESET_TOOLTIP, SET_TOOLTIP_DATA } from '../actions/tooltip';

const init = { visible: false, header: '', content: '', connected: false };

export default function tooltip(state = init, action = {}) {
  switch (action.type) {
    case SET_TOOLTIP_DATA:
      return {
        ...state,
        visible: true,
        header: action.payload.header,
        content: action.payload.content,
        connected: action.payload.connected,
      };
    case RESET_TOOLTIP:
      return { ...init };
    default:
      return state;
  }
}
