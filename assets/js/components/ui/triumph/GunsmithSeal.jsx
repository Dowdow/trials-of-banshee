import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { claimTriumph } from '../../../actions/user';
import { useUserSeal } from '../../../hooks/user';

export default function GunsmithSeal() {
  const dispatch = useDispatch();

  const { nb, total, percent, claimable, completed } = useUserSeal();

  const [claim, setClaim] = useState(false);

  const handleClick = () => {
    if (claimable) {
      setClaim(true);
      dispatch(claimTriumph('gunsmithTitle'));
    }
  };

  const animationClaimEnd = () => {
    setClaim(false);
  };

  return (
    <div>
      <div className="flex justify-between text-xl text-white/60 tracking-wider uppercase">
        <div>Seal progress</div>
        <div>{`${nb}/${total}`}</div>
      </div>
      <div className="w-full h-2 mt-1 bg-white/20">
        <div className="h-2 bg-pink" style={{ width: `${percent}%` }} />
      </div>
      <button type="button" disabled={!claimable} onClick={handleClick} className={`relative w-full mt-3 border-2 font-bold text-lg tracking-wider ${claimable && 'bg-white/30 border-light-green'} ${completed && 'bg-pink/60 border-pink'} ${!claimable && !completed && 'bg-white/20 border-white/50'}`}>
        {claim && (
          <>
            <div className="absolute w-full h-full top-0 left-0 flex justify-between z-10" onAnimationEnd={animationClaimEnd}>
              <div className="h-full bg-pink animate-claim" />
              <div className="h-full bg-pink animate-claim" />
            </div>
            <div className="absolute w-full h-full top-0 left-0 border-4 border-pink animate-claim-border z-10" />
          </>
        )}
        <div className={`p-2 text-left ${completed ? 'text-white/80' : 'text-white/50'}`}>Gunsmith</div>
      </button>
    </div>
  );
}
