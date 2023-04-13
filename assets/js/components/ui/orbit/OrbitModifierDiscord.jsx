import React from 'react';
import OrbitModifierLink from './OrbitModifierLink';
import discord from '../../../../img/socials/discord.svg';

export default function OrbitModifierDiscord() {
  return (
    <OrbitModifierLink
      href="https://discord.gg/qD6GjqmEKz"
      img={discord}
      text="discord"
      description="discord.description"
    />
  );
}
