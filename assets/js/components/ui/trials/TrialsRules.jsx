import React from 'react';
import { useT } from '../../../hooks/translations';
import CategoryTitle from '../CategoryTitle';
import gunsmith from '../../../../img/misc/gunsmith.png';

export default function TrialsRules() {
  const t = useT();
  return (
    <section>
      <CategoryTitle title={t('trials.rules')} />
      <div className="flex items-center gap-6 mt-4">
        <img src={gunsmith} alt={t('gunsmith')} className="w-20 md:w-40 h-20 md:h-40" />
        <ul className="text-sm md:text-base lg:text-lg text-white/90 tracking-wide list-disc">
          <li>{t('trials.rules.1')}</li>
          <li>{t('trials.rules.2')}</li>
          <li>{t('trials.rules.3')}</li>
          <li>{t('trials.rules.4')}</li>
        </ul>
      </div>
    </section>
  );
}
