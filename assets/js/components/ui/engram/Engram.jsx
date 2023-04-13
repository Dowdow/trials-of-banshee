import React from 'react';
import PropTypes from 'prop-types';
import { useT } from '../../../hooks/translations';
import { ENGRAMS, ENGRAM_IMAGES } from '../../../utils/collections';
import EngramEmpty from './EngramEmpty';
import Tooltipable from '../Tooltipable';

export default function Engram({ type, active = false }) {
  const t = useT();

  if (!active) {
    return <EngramEmpty />;
  }

  return (
    <Tooltipable title={ENGRAMS[type]} description="engrams.description">
      {(ref) => (
        <img
          ref={ref}
          src={ENGRAM_IMAGES[type]}
          alt={t(ENGRAMS[type])}
          className="w-24 h-24 hover:brightness-125 transition-all duration-300"
        />
      )}
    </Tooltipable>
  );
}

Engram.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
