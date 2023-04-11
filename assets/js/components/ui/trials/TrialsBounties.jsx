import React from 'react';
import PropTypes from 'prop-types';
import { useCanSeeXur, useTodayBounties, useTodayBoutiesCompletion } from '../../../hooks/bounty';
import { useT } from '../../../hooks/translations';
import { useUserAuthenticated } from '../../../hooks/user';
import { BOUNTY_TYPE } from '../../../utils/bounties';
import CategoryTitle from '../CategoryTitle';
import TrialsBounty from './TrialsBounty';
import TrialsBountySecret from './TrialsBountySecret';

export default function TrialsBounties({ onClick }) {
  const authenticated = useUserAuthenticated();
  const bounties = useTodayBounties();
  const canSeeXur = useCanSeeXur();
  const completions = useTodayBoutiesCompletion();
  const t = useT();

  return (
    <section>
      <CategoryTitle title={t('bounties')} counter={completions} />
      <div className="flex gap-1 mt-4 -ml-1">
        {bounties.filter((b) => b.type === BOUNTY_TYPE.DAILY).map((b) => <TrialsBounty key={b.id} bounty={b} onClick={onClick} />)}
        {bounties.filter((b) => b.type === BOUNTY_TYPE.ASPIRING).map((b) => <TrialsBounty key={b.id} bounty={b} onClick={onClick} />)}
        {bounties.filter((b) => b.type === BOUNTY_TYPE.GUNSMITH).map((b) => <TrialsBounty key={b.id} bounty={b} onClick={onClick} />)}
        {authenticated && canSeeXur && <TrialsBountySecret />}
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
