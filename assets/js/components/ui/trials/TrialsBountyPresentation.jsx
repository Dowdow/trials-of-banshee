import React from 'react';
import { useCurrentBounty } from '../../../hooks/bounty';
import { bountyNameFromType } from '../../../utils/bounties';
import CategoryTitle from '../CategoryTitle';

export default function TrialsBountyPresentation() {
  const currentBounty = useCurrentBounty();

  if (currentBounty === null) return null;

  return (
    <section>
      <CategoryTitle title={bountyNameFromType(currentBounty.type)} />
      <p className="mt-4 text-lg text-white/90">Complete this bounty and receive a random engram.</p>
      <p className="hidden md:block mt-4 text-lg text-white/90">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, illum sit voluptatem consequuntur in eum</p>
    </section>
  );
}
