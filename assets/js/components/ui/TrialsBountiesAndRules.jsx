import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setCurrentBounty } from '../../actions/bounties';
import { useTodayBounties } from '../../hooks/bounty';
import { bountyImageFromType, bountyNameFromType, BOUNTY_TYPE } from '../../utils/bounties';
import gunsmith from '../../../img/misc/gunsmith.png';

export default function TrialsBountiesAndRules() {
  const bounties = useTodayBounties();

  return (
    <div className="w-full pt-10 pl-10">
      <div>
        <h2 className="text-2xl tracking-wide text-white/70 uppercase select-none">Bounties</h2>
        <div className="w-full h-0.5 bg-white/60" />
        <div className="flex gap-1 mt-4 -ml-1">
          {bounties.filter((b) => b.type === BOUNTY_TYPE.DAILY).map((b) => <Bounty key={b.id} b={b} />)}
          {bounties.filter((b) => b.type === BOUNTY_TYPE.ASPIRING).map((b) => <Bounty key={b.id} b={b} />)}
          {bounties.filter((b) => b.type === BOUNTY_TYPE.GUNSMITH).map((b) => <Bounty key={b.id} b={b} />)}
          {bounties.length === 0 && (<div className="text-lg text-white/70 ml-1">No bounties available today</div>)}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl tracking-wide text-white/70 uppercase select-none">Rules</h2>
        <div className="w-full h-0.5 bg-white/60" />
        <div className="flex items-center gap-6 mt-4">
          <img src={gunsmith} alt="Gunsmith logo" className="w-40 h-40" />
          <p className="text-lg text-white/90">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed tincidunt dolor, ut bibendum quam. Nulla sapien nisl, posuere et eros in, pellentesque lobortis lectus. Nulla gravida eleifend elit non vulputate. Aliquam erat volutpat. Mauris porta pharetra enim, sed aliquet odio accumsan at. Nunc sit amet eros tincidunt, porttitor ante non, dignissim mauris. Vestibulum rutrum porttitor nibh in venenatis. Morbi dignissim sodales eros, sed maximus massa faucibus ac. Quisque nec ultricies tortor. Mauris posuere fringilla ligula, ut pulvinar arcu. Nulla aliquet, sem ut pulvinar volutpat, ante diam sollicitudin felis, vel ultricies justo orci ut urna. Quisque sagittis, nisl et mollis ultrices, est tortor mattis dolor, nec posuere turpis tortor at diam. Sed in lacus a tellus ullamcorper eleifend.</p>
        </div>
      </div>
    </div>
  );
}

function Bounty({ b }) {
  const dispatch = useDispatch();

  return (
    <button type="button" onClick={() => dispatch(setCurrentBounty(b.id))} className="p-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
      <div className="bg-white">
        <img src={bountyImageFromType(b.type)} alt={bountyNameFromType(b.type)} className="hover:opacity-70 transition-opacity duration-300" />
      </div>
    </button>
  );
}

Bounty.propTypes = {
  b: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
};
