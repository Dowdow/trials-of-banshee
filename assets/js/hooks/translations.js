import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DEFAULT_LOCALE } from '../utils/locale';

const TranslationContext = React.createContext();

export function useLocale() {
  return useSelector((state) => state?.locale ?? DEFAULT_LOCALE);
}

export function useTranslationContext() {
  const locale = useLocale();

  const [defaultTranslations, setDefaultTranslations] = useState({});
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    import(`../../../translations/${DEFAULT_LOCALE}.json`)
      .then((module) => module.default)
      .then((data) => setDefaultTranslations(data));
  }, [DEFAULT_LOCALE]);

  useEffect(() => {
    import(`../../../translations/${locale}.json`)
      .then((module) => module.default)
      .then((data) => setTranslations(data));
  }, [locale]);

  return { TranslationContext, translations: { defaultTranslations, translations } };
}

export function useT() {
  const { defaultTranslations, translations } = useContext(TranslationContext);

  const replaceParams = useCallback((translation, params) => Object.entries(params)
    .reduce((previous, value) => previous.replaceAll(`{{${value[0]}}}`, value[1]), translation), []);

  const t = useCallback((key, params = {}) => {
    if (typeof key !== 'string' || key.trim() === '') {
      console.err('Empty translations key');
      return '';
    }

    const expectedTranslation = translations?.[key];
    if (!expectedTranslation || expectedTranslation === '🔫') {
      const expectedDefaultTranslation = defaultTranslations[key];
      if (!expectedDefaultTranslation) {
        return key;
      }

      return replaceParams(expectedDefaultTranslation, params);
    }

    return replaceParams(expectedTranslation, params);
  }, [defaultTranslations, translations]);

  return t;
}
