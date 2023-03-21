import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clue from '../../../../img/bounty/clue.jpg';

export default function TrialsClue({ used, disabled, onClick }) {
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
        <img src={clue} alt="Clue" className={`${animationClick ? 'opacity-0 hover:opacity-0' : 'hover:opacity-70'} ${disabled && 'opacity-70'} transition-opacity duration-300`} loading="lazy" />
        {used && (
          <>
            <div className="absolute -bottom-10 -right-10 bg-light-blue h-20 w-20 shadow-dark-grey rotate-45" />
            <div className="absolute bottom-3.5 right-2.5 h-2.5 w-4 border-l-4 border-b-4 border-white -rotate-45" />
          </>
        )}
      </div>
    </button>
  );
}

TrialsClue.propTypes = {
  used: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
