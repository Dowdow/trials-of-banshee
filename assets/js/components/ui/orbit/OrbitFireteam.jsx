import React from 'react';
import { useT } from '../../../hooks/translations';
import { useUser, useUserAuthenticated, useUserError, useUserSeal } from '../../../hooks/user';
import { ROUTES } from '../../../utils/routes';
import { characterClassName, characterGenderName, characterRaceName } from '../../../utils/user';
import Tooltipable from '../Tooltipable';
import defaultEmblem from '../../../../img/emblem/default_emblem.jpg';
import logout from '../../../../img/misc/logout.png';
import warning from '../../../../img/misc/warning.png';

export default function OrbitFireteam() {
  const t = useT();

  const authenticated = useUserAuthenticated();
  const error = useUserError();
  const user = useUser();
  const { completed } = useUserSeal();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="text-sm md:text-base font-bold tracking-[.4em] uppercase text-white/80 select-none">
          {t('orbit.fireteam')}
        </div>
        {authenticated && (
          <Tooltipable title="logout" description="logout.description">
            {(ref) => (
              <a ref={ref} href={ROUTES.OAUTH_LOGOUT} className="cursor-pointer">
                <img src={logout} alt={t('logout')} className="w-6" />
              </a>
            )}
          </Tooltipable>
        )}
      </div>
      <div className="w-full h-[1px] bg-white/60" />
      <div className="w-full md:w-[474px] mt-1">
        {authenticated ? (
          <div className="relative w-full h-24">
            <img src={user.emblemBackgroundPath ? `https://bungie.net${user.emblemBackgroundPath}` : defaultEmblem} alt={t('orbit.emblem.default')} className="w-full h-full object-left object-cover" loading="lazy" />
            <div className="absolute top-1 left-24">
              <div className="text-2xl font-bold text-white tracking-wider text-shadow-sm shadow-gray-light/50 select-none">{user.displayName ? user.displayName : 'Guardian'}</div>
              <div className="text-xl text-white/80 tracking-wider text-shadow-sm shadow-gray-light/50 select-none">
                {`${t(characterClassName(user.characterClass))} ${t(characterGenderName(user.characterGender))} ${t(characterRaceName(user.characterRace))}`}
              </div>
              {completed && (
                <div className="flex gap-x-2 items-center">
                  <div className="text-xl italic text-yellow tracking-wider text-shadow-sm shadow-gray-light/50 select-none">
                    {t('gunsmith')}
                  </div>
                  <div className="h-4 w-3.5 border-2 border-yellow rounded-b-full" />
                </div>
              )}
            </div>
            <div className="absolute top-1 right-1.5 flex gap-1">
              <div className="w-2.5 h-2.5 mt-1.5 border-4 border-yellow rotate-45 shadow-sm shadow-gray-light/50" />
              <div className="font-bold text-4xl text-yellow text-shadow-sm shadow-gray-light/50 tracking-wide select-none">{user.lightLevel}</div>
            </div>
            {error && (
              <div className="absolute bottom-1 right-1.5" title={t('connection.expired')}>
                <img src={warning} alt={t('warning')} className="w-8 h-8" />
              </div>
            )}
          </div>
        ) : (
          <a href={ROUTES.OAUTH_AUTHORIZE} className="w-full h-24 flex items-center gap-5 px-5 bg-gray-light/30 hover:bg-white/20 border border-white/30 hover:border-white/50 transition-colors duration-300 select-none">
            <div className="w-[46.5px] h-[45.5px] min-w-[46.5px] font-bold text-5xl text-center text-white/70 border-2 border-white/70 rounded-full">+</div>
            <div className="text-white/70">
              <div className="text-2xl">{t('orbit.connection')}</div>
              <div className="text-sm">{t('orbit.connection.detail')}</div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
