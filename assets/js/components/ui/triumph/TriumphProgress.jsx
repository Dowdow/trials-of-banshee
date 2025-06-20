import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { claimTriumph } from '../../../actions/user';
import { useT } from '../../../hooks/translations';
import triumphIcon from '../../../../img/misc/triumph_gun.png';

export default function TriumphProgress({ type, title, description, completed = false, value = 0, min = 0, max = 100 }) {
  const dispatch = useDispatch();
  const t = useT();

  const [claim, setClaim] = useState(false);

  const claimable = useMemo(() => !completed && value >= max, [completed, value, max]);
  const progress = useMemo(() => Math.min(Math.max(100 * ((value - min) / (max - min)), 0), 100), [value, min, max]);

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
    <button type="button" onClick={handleClick} disabled={!claimable} className={`relative flex flex-col justify-between bg-white/10 border box-border ${claimable && 'border-green-light'} ${completed && 'border-yellow'} ${!claimable && !completed && 'border-white/30'}`}>
      {claim && (
        <>
          <div className="absolute w-full h-full top-0 left-0 flex justify-between z-10" onAnimationEnd={animationClaimEnd}>
            <div className="h-full bg-white animate-claim" />
            <div className="h-full bg-white animate-claim" />
          </div>
          <div className="absolute w-full h-full top-0 left-0 border-4 border-white animate-claim-border z-10" />
        </>
      )}
      <div className="w-full p-6 pb-3">
        <div className="flex items-center gap-2">
          <img src={triumphIcon} alt={t('triumph')} className="w-8 h-8 object-cover" />
          <div className={`text-xl text-left font-bold tracking-wider ${completed ? 'text-yellow' : 'text-white/70'}`}>
            {title}
          </div>
        </div>
        <div className={`w-full h-[1px] mt-2 mb-3 ${completed ? 'bg-yellow' : 'bg-white/50'}`} />
        <div className={`text-lg text-left tracking-wide ${completed ? 'text-yellow' : 'text-white/50'}`}>
          {description}
        </div>
        <div className={`text-lg text-right tracking-wide ${completed ? 'text-yellow' : 'text-white/70'}`}>
          {`${value} / ${max}`}
        </div>
      </div>
      <div className="w-full h-2 bg-white/30">
        <div className={`h-2 ${completed ? 'bg-yellow' : 'bg-white/70'}`} style={{ width: `${progress}%` }} />
      </div>
    </button>
  );
}

TriumphProgress.propTypes = {
  type: PropTypes.string.isRequired,
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
