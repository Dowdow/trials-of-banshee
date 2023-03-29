import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { claimTriumph } from '../../../actions/user';
import { useT } from '../../../hooks/translations';
import gunsmith from '../../../../img/misc/gunsmith.png';
import triumphIcon from '../../../../img/misc/triumph_gun.png';

export default function Triumph({ type, title, description, badge = false, claimable = false, completed = false }) {
  const dispatch = useDispatch();
  const t = useT();

  const [claim, setClaim] = useState(false);

  const handleClick = () => {
    if (claimable) {
      setClaim(true);
      dispatch(claimTriumph(type));
    }
  };

  const animationClaimEnd = () => {
    setClaim(false);
  };

  return (
    <button type="button" disabled={!claimable || completed} onClick={handleClick} className={`relative bg-white/10 border ${claimable && 'border-light-green'} ${completed && 'border-yellow'} ${!claimable && !completed && 'border-white/30'}`}>
      {claim && (
        <>
          <div className="absolute w-full h-full top-0 left-0 flex justify-between z-10" onAnimationEnd={animationClaimEnd}>
            <div className="h-full bg-white animate-claim" />
            <div className="h-full bg-white animate-claim" />
          </div>
          <div className="absolute w-full h-full top-0 left-0 border-4 border-white animate-claim-border z-10" />
        </>
      )}
      <div className="w-full p-6">
        <div className="flex items-center gap-2">
          <img src={badge ? gunsmith : triumphIcon} alt={t('triumph')} className="w-8 h-8 object-cover" />
          <div className={`text-xl font-bold tracking-wider ${completed ? 'text-yellow' : 'text-white/70'}`}>{title}</div>
        </div>
        <div className={`w-full h-[1px] mt-2 mb-3 ${completed ? 'bg-yellow' : 'bg-white/50'}`} />
        <div className={`text-lg text-left tracking-wide ${completed ? 'text-yellow' : 'text-white/50'}`}>{description}</div>
      </div>
    </button>
  );
}

Triumph.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  badge: PropTypes.bool,
  claimable: PropTypes.bool,
  completed: PropTypes.bool,
};

Triumph.defaultProps = {
  badge: false,
  claimable: false,
  completed: false,
};
