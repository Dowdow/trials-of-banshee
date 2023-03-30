import React from 'react';
import { useT } from '../../../hooks/translations';
import OrbitModifierLink from './OrbitModifierLink';
import twitter from '../../../../img/socials/twitter.svg';

export default function OrbitModifierTwitter() {
  const t = useT();
  return (
    <OrbitModifierLink
      href="https://twitter.com/TrialsOfBanshee"
      img={twitter}
      text={t('twitter')}
      description={t('twitter.description')}
    />
  );
}
