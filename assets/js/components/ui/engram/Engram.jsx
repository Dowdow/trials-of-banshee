import React from 'react';
import PropTypes from 'prop-types';
import EngramEmpty from './EngramEmpty';
import { useT } from '../../../hooks/translations';
import { ENGRAMS, ENGRAM_IMAGES } from '../../../utils/collections';

export default function Engram({ type, active = false }) {
  const t = useT();
  if (!active) {
    return <EngramEmpty />;
  }
  return <img src={ENGRAM_IMAGES[type]} alt={t(ENGRAMS[type])} className="w-24 h-24 hover:brightness-125 transition-all duration-300" />;
}

Engram.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
