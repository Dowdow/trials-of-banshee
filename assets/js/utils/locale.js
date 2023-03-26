export const de = 'de';
export const en = 'en';
export const esMx = 'es-mx';
export const es = 'es';
export const fr = 'fr';
export const it = 'it';
export const ja = 'ja';
export const ko = 'ko';
export const pl = 'pl';
export const ptBr = 'pt-br';
export const ru = 'ru';
export const zhChs = 'zh-chs';
export const zhCht = 'zh-cht';

export const DEFAULT_LOCALE = en;

export const SUPPORTED_LOCALES = [
  de,
  en,
  esMx,
  es,
  fr,
  it,
  ja,
  ko,
  pl,
  ptBr,
  ru,
  zhChs,
  zhCht,
];

export function localeToName(locale) {
  switch (locale) {
    case de:
      return 'Deutsch';
    case en:
      return 'English';
    case esMx:
      return 'Español (Latinoamérica)';
    case es:
      return 'Español (España)';
    case fr:
      return 'Français';
    case it:
      return 'Italiano';
    case ja:
      return '日本語';
    case ko:
      return '한국어';
    case pl:
      return 'Polski';
    case ptBr:
      return 'Português Brasileiro';
    case ru:
      return 'Русский';
    case zhChs:
      return '简体中文';
    case zhCht:
      return '繁體中文';
    default:
      return 'Unknown';
  }
}

export function guessLocale() {
  const storageLocale = localStorage.getItem('locale');
  if (storageLocale !== null) {
    return storageLocale;
  }

  const locale = navigator.language.split('-')[0] || DEFAULT_LOCALE;
  if (SUPPORTED_LOCALES.includes(locale)) {
    return locale;
  }

  return DEFAULT_LOCALE;
}
