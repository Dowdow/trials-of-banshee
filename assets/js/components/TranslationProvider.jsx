import React from 'react';
import PropTypes from 'prop-types';
import { useTranslationContext } from '../hooks/translations';

export default function TranslationProvider({ children }) {
  const { TranslationContext, translations } = useTranslationContext();
  return (
    <TranslationContext.Provider value={translations}>
      {children}
    </TranslationContext.Provider>
  );
}

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
