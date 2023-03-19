import React from 'react';
import PropTypes from 'prop-types';
import gunsmith from '../../../../img/misc/gunsmith.png';
import triumphIcon from '../../../../img/misc/triumph_gun.png';

export default function Triumph({ title, description, badge = false, completed = false }) {
  return (
    <button type="button" className={`p-6 bg-white/10 border ${completed ? 'border-yellow' : 'border-white/30'}`}>
      <div className="flex items-center gap-2">
        <img src={badge ? gunsmith : triumphIcon} alt="Triumph Icon" className="w-8 h-8 object-cover" />
        <div className={`text-xl font-bold tracking-wider ${completed ? 'text-yellow' : 'text-white/70'}`}>{title}</div>
      </div>
      <div className={`w-full h-[1px] mt-2 mb-3 ${completed ? 'bg-yellow' : 'bg-white/50'}`} />
      <div className={`text-lg text-left tracking-wide ${completed ? 'text-yellow' : 'text-white/50'}`}>{description}</div>
    </button>
  );
}

Triumph.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  badge: PropTypes.bool,
  completed: PropTypes.bool,
};

Triumph.defaultProps = {
  badge: false,
  completed: false,
};
