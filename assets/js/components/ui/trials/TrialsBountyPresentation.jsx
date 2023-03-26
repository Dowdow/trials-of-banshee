import React from 'react';
import { useCurrentBounty } from '../../../hooks/bounty';
import { useT } from '../../../hooks/translations';
import { bountyNameFromType, BOUNTY_TYPE } from '../../../utils/bounties';
import CategoryTitle from '../CategoryTitle';

export default function TrialsBountyPresentation() {
  const currentBounty = useCurrentBounty();
  const t = useT();

  if (currentBounty === null) return null;

  return (
    <section>
      <CategoryTitle title={t(bountyNameFromType(currentBounty.type))} />
      <p className="mt-4 text-lg text-white/90">
        {t('trials.presentation')}
      </p>
      <p className="hidden md:block mt-4 text-lg text-white/90">
        {currentBounty.type === BOUNTY_TYPE.DAILY && t('trials.presentation.daily.more')}
        {currentBounty.type === BOUNTY_TYPE.ASPIRING && t('trials.presentation.aspiring.more')}
        {currentBounty.type === BOUNTY_TYPE.GUNSMITH && t('trials.presentation.gunsmith.more')}
      </p>
    </section>
  );
}
