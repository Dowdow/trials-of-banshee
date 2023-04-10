import React from 'react';
import { useCurrentBounty } from '../../../hooks/bounty';
import { useT } from '../../../hooks/translations';
import { BOUNTY_TYPE } from '../../../utils/bounties';

export default function TrialsFlawless() {
  const currentBounty = useCurrentBounty();
  const t = useT();

  if (currentBounty.type === BOUNTY_TYPE.DAILY) {
    return null;
  }

  return (
    <section className="flex flex-col gap-1.5">
      <div className="border-b-2 border-white/60 text-xl md:text-2xl tracking-wide text-white/70 uppercase whitespace-nowrap select-none">
        {t('trials.bounty.flawless')}
      </div>
      <div className={`relative w-5 h-5 p-0.5 border border-white/30 text-white/90 text-base lg:text-xl tracking-wide ${currentBounty.flawless === false && 'animate-flawless-roll'}`}>
        <div className={`absolute w-[1.375rem] h-[1.375rem] -top-0.5 -left-0.5 border-2 border-white opacity-0 ${currentBounty.flawless !== false && 'animate-flawless-pop'}`} />
        <div className={`w-full h-full ${currentBounty.flawless === false ? 'bg-red' : 'bg-light-green'} transition-colors duration-300`} />
      </div>
    </section>
  );
}
