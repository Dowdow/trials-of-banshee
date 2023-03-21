import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useUserAuthenticated } from '../../../hooks/user';
import { bountyImageFromType, bountyNameFromType, BOUNTY_TYPE } from '../../../utils/bounties';
import { isBountyCompleted } from '../../../utils/localStorage';

export default function TrialsBounty({ bounty, onClick }) {
  const authenticated = useUserAuthenticated();

  const completed = useMemo(() => bounty.completed || isBountyCompleted(bounty.id), [bounty.id, bounty.completed]);
  const disabled = useMemo(() => completed || (!authenticated && (bounty.type === BOUNTY_TYPE.ASPIRING || bounty.type === BOUNTY_TYPE.GUNSMITH)), [authenticated, completed, bounty.type]);

  const [animationClick, setAnimationClick] = useState(false);

  const handleClick = () => {
    if (authenticated || (!authenticated && bounty.type === BOUNTY_TYPE.DAILY)) {
      setAnimationClick(true);
    }
  };

  const handleAnimationEnd = () => {
    if (authenticated || (!authenticated && bounty.type === BOUNTY_TYPE.DAILY)) {
      onClick(bounty.id);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={`p-0.5 border-2 border-transparent disabled:hover:border-white/30 ${animationClick ? 'hover:border-transparent' : 'hover:border-white/70'} transition-colors duration-300 disabled:cursor-not-allowed`} disabled={disabled} onAnimationEnd={handleAnimationEnd}>
      <div className={`relative overflow-hidden ${animationClick && 'animate-bounty'} ${disabled ? 'bg-dark-grey' : 'bg-white'}`}>
        <img src={bountyImageFromType(bounty.type)} alt={bountyNameFromType(bounty.type)} className={`${animationClick ? 'opacity-0 hover:opacity-0' : 'hover:opacity-70'} ${disabled && 'opacity-70'} transition-opacity duration-300`} loading="lazy" />
        {completed && (
          <>
            <div className="absolute -bottom-10 -right-10 bg-light-blue h-20 w-20 shadow-dark-grey rotate-45" />
            <div className="absolute bottom-3.5 right-2.5 h-2.5 w-4 border-l-4 border-b-4 border-white -rotate-45" />
          </>
        )}
      </div>
    </button>
  );
}

TrialsBounty.propTypes = {
  bounty: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    completed: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
