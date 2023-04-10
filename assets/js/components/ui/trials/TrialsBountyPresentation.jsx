import React from 'react';
import { useCurrentBounty } from '../../../hooks/bounty';
import { useT } from '../../../hooks/translations';
import { bountyNameFromType, bountyPresentationFromType } from '../../../utils/bounties';
import CategoryTitle from '../CategoryTitle';

export default function TrialsBountyPresentation() {
  const currentBounty = useCurrentBounty();
  const t = useT();

  if (currentBounty === null) return null;

  return (
    <section>
      <CategoryTitle title={t(bountyNameFromType(currentBounty.type))} />
      <div className="mt-1.5 text-sm md:text-lg text-white/80 tracking-wide">
        {t(bountyPresentationFromType(currentBounty.type))}
      </div>
    </section>
  );
}
