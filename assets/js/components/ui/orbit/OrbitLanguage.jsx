import React from 'react';
import { useDispatch } from 'react-redux';
import { localeChange } from '../../../actions/locale';
import { useLocale } from '../../../hooks/translations';
import { localeToName, SUPPORTED_LOCALES } from '../../../utils/locale';

export default function OrbitLanguage() {
  const dispatch = useDispatch();
  const locale = useLocale();

  const handleChange = (e) => {
    dispatch(localeChange(e.target.value));
  };

  return (
    <div className="w-full p-0.5 border-2 border-transparent hover:border-white/80 transition-colors duration-300">
      <select value={locale} onChange={handleChange} className="flex justify-center items-center w-full h-10 bg-gray-light/20 hover:bg-gray-light/40 border border-white/50 hover:border-white/70 text-base md:text-lg text-center uppercase tracking-[.4em] text-white/80 transition-colors duration-300 appearance-none cursor-pointer backdrop-blur">
        {SUPPORTED_LOCALES.map((l) => (
          <option key={l} value={l} className="font-neue-haas-display-roman text-base md:text-lg uppercase tracking-[.4em] text-dark">{localeToName(l)}</option>
        ))}
      </select>
    </div>
  );
}
