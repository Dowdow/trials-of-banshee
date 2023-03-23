import React from 'react';
import { useUser, useUserAuthenticated, useUserSeal } from '../../../hooks/user';
import { characterClassName, characterGenderName, characterRaceName } from '../../../utils/user';
import defaultEmblem from '../../../../img/emblem/default_emblem.jpg';
import { ROUTES } from '../../../utils/routes';

export default function OrbitFireteam() {
  const authenticated = useUserAuthenticated();
  const user = useUser();
  const { completed } = useUserSeal();

  return (
    <div className="flex flex-col">
      <div className="text-sm md:text-base font-bold tracking-[.4em] uppercase text-white/80 select-none">Fireteam</div>
      <div className="w-full h-[1px] bg-white/60" />
      <div className="w-full md:w-[474px] mt-1">
        {authenticated ? (
          <div className="relative w-full h-24">
            <img src={user.emblemBackgroundPath ? `https://bungie.net${user.emblemBackgroundPath}` : defaultEmblem} alt="Character Emblem" className="w-full h-full object-left object-cover" loading="lazy" />
            <div className="absolute top-1 left-24">
              <div className="text-2xl font-bold text-white tracking-wider text-shadow-sm shadow-light-grey/50 select-none">{user.displayName ? user.displayName : 'Guardian'}</div>
              <div className="text-xl text-white/80 tracking-wider text-shadow-sm shadow-light-grey/50 select-none">{`${characterClassName(user.characterClass)} ${characterGenderName(user.characterGender)} ${characterRaceName(user.characterRace)}`}</div>
              {completed && (
                <div className="flex gap-x-2 items-center">
                  <div className="text-xl italic text-yellow tracking-wider text-shadow-sm shadow-light-grey/50 select-none">Gunsmith</div>
                  <div className="h-4 w-3.5 border-2 border-yellow rounded-b-full" />
                </div>
              )}
            </div>
            <div className="absolute top-1 right-1.5 flex gap-1">
              <div className="w-2.5 h-2.5 mt-1.5 border-4 border-yellow rotate-45 shadow-sm shadow-light-grey/50" />
              <div className="font-bold text-4xl text-yellow text-shadow-sm shadow-light-grey/50 tracking-wide select-none">{user.lightLevel}</div>
            </div>
          </div>
        ) : (
          <a href={ROUTES.OAUTH_AUTHORIZE} className="w-full h-24 flex items-center gap-5 pl-5 bg-light-grey/30 hover:bg-white/20 border border-white/30 hover:border-white/50 transition-colors duration-300 select-none">
            <div className="w-11 h-11 flex justify-between items-center border-2 border-white/70 rounded-full">
              <div className="pl-[5.5px] pt-[4.5px] font-bold text-5xl text-white/70">+</div>
            </div>
            <div className="text-white/70">
              <div className="text-2xl">Connexion with Bungie</div>
              <div className="text-sm">You can still play as guest but with limited functionnalities</div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
