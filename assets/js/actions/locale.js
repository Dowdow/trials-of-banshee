import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../utils/locale';

export const LOCALE_CHANGE = 'LOCALE_CHANGE';

export function localeChange(locale) {
  const payload = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  localStorage.setItem('locale', payload);
  return (dispatch) => dispatch({ type: LOCALE_CHANGE, payload });
}
