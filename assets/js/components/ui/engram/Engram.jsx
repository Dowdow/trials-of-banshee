import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { resetTooltip, setTooltip } from '../../../actions/tooltip';
import { useT } from '../../../hooks/translations';
import { ENGRAMS, ENGRAM_IMAGES } from '../../../utils/collections';
import EngramEmpty from './EngramEmpty';

export default function Engram({ type, active = false }) {
  const dispatch = useDispatch();
  const t = useT();

  const handleMouseEnter = () => {
    dispatch(setTooltip(t(ENGRAMS[type]), t('engrams.description')));
  };

  const handleMouseLeave = () => {
    dispatch(resetTooltip());
  };

  if (!active) {
    return <EngramEmpty />;
  }

  return (
    <img
      src={ENGRAM_IMAGES[type]}
      alt={t(ENGRAMS[type])}
      className="w-24 h-24 hover:brightness-125 transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

Engram.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
