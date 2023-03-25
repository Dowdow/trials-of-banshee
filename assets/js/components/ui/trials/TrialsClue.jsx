import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clue from '../../../../img/bounty/clue.jpg';
import { CLUE_TYPE } from '../../../utils/bounties';
import { WEAPON_DAMAGE_TYPE_IMAGE, WEAPON_DAMAGE_TYPE_NAME, WEAPON_RARITY_IMAGE, WEAPON_RARITY_NAME, WEAPON_TYPE_IMAGE, WEAPON_TYPE_NAME } from '../../../utils/weapons';
import { useCurrentBounty } from '../../../hooks/bounty';

export default function TrialsClue({ type, used, disabled, onClick }) {
  const currentBounty = useCurrentBounty();

  const [animationClick, setAnimationClick] = useState(false);

  const handleClick = () => {
    setAnimationClick(true);
  };

  const handleAnimationEnd = () => {
    onClick();
    setAnimationClick(false);
  };

  return (
    <button type="button" onClick={handleClick} className={`p-0.5 border-2 border-transparent disabled:hover:border-white/30 ${animationClick ? 'hover:border-transparent' : 'hover:border-white/70'} transition-colors duration-300 disabled:cursor-not-allowed`} disabled={disabled} onAnimationEnd={handleAnimationEnd}>
      <div className={`relative overflow-hidden ${animationClick && 'animate-bounty'} ${disabled ? 'bg-dark-grey' : 'bg-white'}`}>
        {used ? (
          <>
            <div className="w-24 h-24 p-2 flex justify-center items-center bg-blue border-8 border-white/70 shadow">
              {type === CLUE_TYPE.RARITY && (
                <img
                  src={WEAPON_RARITY_IMAGE[currentBounty.clues.rarity]}
                  alt={WEAPON_RARITY_NAME[currentBounty.clues.rarity]}
                  className="w-10 h-10"
                  loading="lazy"
                />
              )}
              {type === CLUE_TYPE.DAMAGE_TYPE && (
                <img
                  src={WEAPON_DAMAGE_TYPE_IMAGE[currentBounty.clues.damageType]}
                  alt={WEAPON_DAMAGE_TYPE_NAME[currentBounty.clues.damageType]}
                  loading="lazy"
                />
              )}
              {type === CLUE_TYPE.WEAPON_TYPE && (
                <img
                  src={WEAPON_TYPE_IMAGE[currentBounty.clues.weaponType]}
                  alt={WEAPON_TYPE_NAME[currentBounty.clues.weaponType]}
                  loading="lazy"
                />
              )}
            </div>
            <div className="absolute -bottom-10 -right-10 bg-light-blue h-20 w-20 shadow-dark-grey rotate-45" />
            <div className="absolute bottom-3.5 right-2.5 h-2.5 w-4 border-l-4 border-b-4 border-white -rotate-45" />
          </>
        ) : (
          <img src={clue} alt="Clue" className={`w-24 h-24 ${animationClick ? 'opacity-0 hover:opacity-0' : 'hover:opacity-70'} ${disabled && 'opacity-70'} transition-opacity duration-300`} loading="lazy" />
        )}
      </div>
    </button>
  );
}

TrialsClue.propTypes = {
  type: PropTypes.string.isRequired,
  used: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
