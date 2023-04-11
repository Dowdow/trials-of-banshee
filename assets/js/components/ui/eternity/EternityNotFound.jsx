import React from 'react';
import CategoryTitle from '../CategoryTitle';
import { useT } from '../../../hooks/translations';

export default function EternityNotFound() {
  const t = useT();
  return (
    <section>
      <CategoryTitle title={t('eternity')} />
      <div className="mt-4 text-lg text-white tracking-wide">
        {t('eternity.notfound')}
      </div>
    </section>
  );
}
