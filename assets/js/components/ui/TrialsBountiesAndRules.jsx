import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTodayBounties } from '../../hooks/bounty';
import { useAuthenticated } from '../../hooks/user';
import { bountyImageFromType, bountyNameFromType, BOUNTY_TYPE } from '../../utils/bounties';
import { isBountyCompleted } from '../../utils/localStorage';
import gunsmith from '../../../img/misc/gunsmith.png';

export default function TrialsBountiesAndRules({ onClick }) {
  const bounties = useTodayBounties();

  return (
    <div className="w-full">
      <div>
        <h2 className="text-xl md:text-2xl tracking-wide text-white/70 uppercase select-none">Bounties</h2>
        <div className="w-full h-0.5 bg-white/60" />
        <div className="flex gap-1 mt-4 -ml-1">
          {bounties.filter((b) => b.type === BOUNTY_TYPE.DAILY).map((b) => <Bounty key={b.id} b={b} onClick={onClick} />)}
          {bounties.filter((b) => b.type === BOUNTY_TYPE.ASPIRING).map((b) => <Bounty key={b.id} b={b} onClick={onClick} />)}
          {bounties.filter((b) => b.type === BOUNTY_TYPE.GUNSMITH).map((b) => <Bounty key={b.id} b={b} onClick={onClick} />)}
          {bounties.length === 0 && (<div className="text-lg text-white/70 ml-1">No bounties available today</div>)}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl tracking-wide text-white/70 uppercase select-none">Rules</h2>
        <div className="w-full h-0.5 bg-white/60" />
        <div className="flex items-center gap-6 mt-4">
          <img src={gunsmith} alt="Gunsmith logo" className="hidden md:block w-40 h-40" />
          <p className="text-lg text-white/90">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed tincidunt dolor, ut bibendum quam. Nulla sapien nisl, posuere et eros in, pellentesque lobortis lectus. Nulla gravida eleifend elit non vulputate. Aliquam erat volutpat. Mauris porta pharetra enim, sed aliquet odio accumsan at. Nunc sit amet eros tincidunt, porttitor ante non, dignissim mauris. Vestibulum rutrum porttitor nibh in venenatis.</p>
        </div>
      </div>
    </div>
  );
}

function Bounty({ b, onClick }) {
  const authenticated = useAuthenticated();

  const completed = useMemo(() => b.completed || isBountyCompleted(b.id), [b.id, b.completed]);
  const disabled = useMemo(() => completed || (!authenticated && (b.type === BOUNTY_TYPE.ASPIRING || b.type === BOUNTY_TYPE.GUNSMITH)), [authenticated, completed, b.type]);

  const handleClick = () => {
    if (authenticated || (!authenticated && b.type === BOUNTY_TYPE.DAILY)) {
      onClick(b.id);
    }
  };

  return (
    <button type="button" onClick={handleClick} className="p-0.5 border-2 border-transparent hover:border-white/70 disabled:hover:border-white/30 transition-colors duration-300 disabled:cursor-not-allowed" disabled={disabled}>
      <div className={`relative overflow-hidden ${disabled ? 'bg-dark-grey' : 'bg-white'}`}>
        <img src={bountyImageFromType(b.type)} alt={bountyNameFromType(b.type)} className={`${disabled && 'opacity-70'} hover:opacity-70 transition-opacity duration-300`} loading="lazy" />
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

TrialsBountiesAndRules.propTypes = {
  onClick: PropTypes.func.isRequired,
};

Bounty.propTypes = {
  b: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    completed: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
