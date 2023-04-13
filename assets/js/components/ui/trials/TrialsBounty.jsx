import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useT } from '../../../hooks/translations';
import { useUserAuthenticated } from '../../../hooks/user';
import { bountyDescriptionFromType, bountyImageFromType, bountyNameFromType } from '../../../utils/bounties';
import { isBountyCompleted } from '../../../utils/localStorage';
import Tooltipable from '../Tooltipable';

export default function TrialsBounty({ bounty, onClick }) {
  const authenticated = useUserAuthenticated();
  const t = useT();

  const completed = useMemo(() => bounty.completed || isBountyCompleted(bounty.id), [bounty.id, bounty.completed]);

  const bountyName = useMemo(() => t(bountyNameFromType(bounty.type)), [bounty]);

  const [animationClick, setAnimationClick] = useState(false);

  const handleClick = () => {
    setAnimationClick(true);
  };

  const handleAnimationEnd = () => {
    onClick(bounty.id);
  };

  return (
    <Tooltipable title={bountyNameFromType(bounty.type)} description={bountyDescriptionFromType(bounty.type)} connected={!authenticated}>
      {(ref) => (
        <button
          ref={ref}
          type="button"
          disabled={completed}
          onClick={handleClick}
          className={`p-0.5 border-2 border-transparent disabled:hover:border-white/30 ${animationClick ? 'hover:border-transparent' : 'hover:border-white/70'} transition-colors duration-300 disabled:cursor-not-allowed`}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className={`relative overflow-hidden ${animationClick && 'animate-bounty'} ${completed ? 'bg-gray-dark' : 'bg-white'}`}>
            <img
              src={bountyImageFromType(bounty.type)}
              alt={bountyName}
              className={`${animationClick ? 'opacity-0 hover:opacity-0' : 'hover:opacity-70'} ${completed && 'opacity-70'} transition-opacity duration-300`}
              loading="lazy"
            />
            {completed && (
              <>
                <div className={`absolute -bottom-10 -right-10 ${bounty.flawless || bounty.attempts === 1 ? 'bg-yellow' : 'bg-blue-light'} h-20 w-20 rotate-45`} />
                <div className="absolute bottom-3.5 right-2.5 h-2.5 w-4 border-l-4 border-b-4 border-white -rotate-45" />
              </>
            )}
            {!completed && bounty.history.length > 0 && (
              <>
                <div className="absolute -bottom-10 -right-10 bg-red-light h-20 w-20 shadow-gray-dark rotate-45" />
                <div className="absolute bottom-9 right-3.5 h-2.5 w-4 text-white text-6xl">~</div>
              </>
            )}
          </div>
        </button>
      )}
    </Tooltipable>
  );
}

TrialsBounty.propTypes = {
  bounty: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    completed: PropTypes.bool,
    history: PropTypes.array,
    flawless: PropTypes.bool,
    attempts: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
