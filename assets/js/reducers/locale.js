import { LOCALE_CHANGE } from '../actions/locale';
import { DEFAULT_LOCALE } from '../utils/locale';

export default function locale(state = DEFAULT_LOCALE, action = {}) {
  switch (action.type) {
    case LOCALE_CHANGE:
      return action.payload;
    default:
      return state;
  }
}
