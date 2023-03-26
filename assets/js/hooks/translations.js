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

  const t = useCallback((key) => {
    const expectedTranslation = translations?.[key];
    if (expectedTranslation === undefined || expectedTranslation === '🦆') {
      return defaultTranslations[key];
    }
    return expectedTranslation;
  }, [defaultTranslations, translations]);

  return t;
}
