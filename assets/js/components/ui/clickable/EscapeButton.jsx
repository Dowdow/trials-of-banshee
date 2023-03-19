import React from 'react';
import PropTypes from 'prop-types';
import EscapeKey from './EscapeKey';
import { useEscapeKey } from '../../../hooks/keyboard';

export default function EscapeButton({ onClick, text }) {
  useEscapeKey(onClick);
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
      <EscapeKey />
      <span className="text-xl md:text-2xl tracking-wide text-white/80">{text}</span>
    </button>
  );
}

EscapeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
