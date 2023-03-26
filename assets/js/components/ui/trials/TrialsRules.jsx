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
        <img src={gunsmith} alt={t('gunsmith')} className="hidden md:block w-40 h-40" />
        <p className="text-lg text-white/90">{t('trials.rules.description')}</p>
      </div>
    </section>
  );
}
