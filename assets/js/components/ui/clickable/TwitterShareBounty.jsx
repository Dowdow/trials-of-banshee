import React from 'react';
import { useT } from '../../../hooks/translations';
import { useTwitterIntentBounty } from '../../../hooks/twitter';
import twitter from '../../../../img/socials/twitter_blue.svg';

export default function TwitterShareBounty() {
  const t = useT();
  const url = useTwitterIntentBounty();
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
      <div className="w-6 h-6 flex justify-center items-center">
        <img src={twitter} alt="Twitter" className="w-full h-full object-contain" />
      </div>
      <span className="text-xl md:text-2xl tracking-wide text-white/80">{t('share')}</span>
    </a>
  );
}
