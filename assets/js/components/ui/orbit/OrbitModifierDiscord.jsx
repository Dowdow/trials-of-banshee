import React from 'react';
import { useT } from '../../../hooks/translations';
import OrbitModifierLink from './OrbitModifierLink';
import discord from '../../../../img/socials/discord.svg';

export default function OrbitModifierDiscord() {
  const t = useT();
  return (
    <OrbitModifierLink
      href="https://discord.gg/qD6GjqmEKz"
      img={discord}
      text={t('discord')}
      description={t('discord.description')}
    />
  );
}
