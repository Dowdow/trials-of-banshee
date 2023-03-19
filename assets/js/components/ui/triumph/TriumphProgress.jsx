import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import triumphIcon from '../../../../img/misc/triumph_gun.png';

export default function TriumphProgress({ title, description, completed = false, value = 0, min = 0, max = 100 }) {
  const progress = useMemo(() => Math.min(Math.max(100 * ((value - min) / (max - min)), 0), 100), [value, min, max]);
  return (
    <button type="button" className={`flex flex-col justify-between bg-white/10 border ${completed ? 'border-yellow' : 'border-white/30'}`}>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <img src={triumphIcon} alt="Triumph Icon" className="w-8 h-8 object-cover" />
          <div className={`text-xl font-bold tracking-wider ${completed ? 'text-yellow' : 'text-white/70'}`}>{title}</div>
        </div>
        <div className={`w-full h-[1px] mt-2 mb-3 ${completed ? 'bg-yellow' : 'bg-white/50'}`} />
        <div className={`text-lg text-left tracking-wide ${completed ? 'text-yellow' : 'text-white/50'}`}>{description}</div>
      </div>
      <div className="w-full h-2 bg-white/30">
        <div className={`h-2 ${completed ? 'bg-yellow' : 'bg-white/70'}`} style={{ width: `${progress}%` }} />
      </div>
    </button>
  );
}

TriumphProgress.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

TriumphProgress.defaultProps = {
  completed: false,
  value: 0,
  min: 0,
  max: 100,
};
