import React from 'react';
import { useNextBountiesCounter } from '../../../hooks/counter';
import { useT } from '../../../hooks/translations';
import CategoryTitle from '../CategoryTitle';
import gunsmith from '../../../../img/misc/gunsmith.png';

export default function TrialsInformations() {
  const t = useT();

  const { hoursLeft, minutesLeft, secondsLeft } = useNextBountiesCounter();

  return (
    <section className="relative w-full h-full overflow-hidden select-none">
      <CategoryTitle title={t('trials.informations')} />
      <img src={gunsmith} alt={t('gunsmith')} className="absolute left-0 right-0 mx-auto w-full max-w-md h-full object-cover opacity-25" />
      <div className="absolute mt-4">
        <div className="flex flex-col gap-y-2 text-white/90 tracking-wide">
          <div className="text-base lg:text-xl">{t('trials.informations.common')}</div>
          <div className="flex flex-col items-center md:items-start gap-y-1">
            <div className="text-xl">{t('trials.informations.next')}</div>
            <div className="flex justify-between gap-x-0.5 text-3xl font-neue-haas-display-bold">
              <div>{hoursLeft}</div>
              <div>:</div>
              <div>{minutesLeft}</div>
              <div>:</div>
              <div>{secondsLeft}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
