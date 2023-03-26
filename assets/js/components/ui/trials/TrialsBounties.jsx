import React from 'react';
import PropTypes from 'prop-types';
import { useTodayBounties } from '../../../hooks/bounty';
import { useT } from '../../../hooks/translations';
import { BOUNTY_TYPE } from '../../../utils/bounties';
import CategoryTitle from '../CategoryTitle';
import TrialsBounty from './TrialsBounty';

export default function TrialsBounties({ onClick }) {
  const bounties = useTodayBounties();
  const t = useT();

  return (
    <section>
      <CategoryTitle title={t('bounties')} />
      <div className="flex gap-1 mt-4 -ml-1">
        {bounties.filter((b) => b.type === BOUNTY_TYPE.DAILY).map((b) => <TrialsBounty key={b.id} bounty={b} onClick={onClick} />)}
        {bounties.filter((b) => b.type === BOUNTY_TYPE.ASPIRING).map((b) => <TrialsBounty key={b.id} bounty={b} onClick={onClick} />)}
        {bounties.filter((b) => b.type === BOUNTY_TYPE.GUNSMITH).map((b) => <TrialsBounty key={b.id} bounty={b} onClick={onClick} />)}
        {bounties.length === 0 && (
          <div className="text-lg text-white/70 ml-1">
            {t('trials.bounties.empty')}
          </div>
        )}
      </div>
    </section>
  );
}

TrialsBounties.propTypes = {
  onClick: PropTypes.func.isRequired,
};
