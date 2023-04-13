import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserPlayer } from '../../actions/user';
import { useInterfaceMoveOnPointerMove } from '../../hooks/pointer';
import { useT } from '../../hooks/translations';
import { useUserAuthenticated } from '../../hooks/user';
import InitFade from '../ui/InitFade';
import OrbitFireteam from '../ui/orbit/OrbitFireteam';
import OrbitInformations from '../ui/orbit/OrbitInformations';
import OrbitLanguage from '../ui/orbit/OrbitLanguage';
import OrbitModifierDiscord from '../ui/orbit/OrbitModifierDiscord';
import OrbitModifierTwitter from '../ui/orbit/OrbitModifierTwitter';
import orbit from '../../../img/orbit.png';

export default function IndexPage() {
  const authenticated = useUserAuthenticated();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const t = useT();

  const [launchFade, setLaunchFade] = useState(false);
  const [zoomEarth, setZoomEarth] = useState(false);

  const { x, y } = useInterfaceMoveOnPointerMove();

  useEffect(() => {
    if (authenticated) {
      dispatch(getUserPlayer());
    }
  }, []);

  return (
    <>
      <div className="absolute w-full h-screen overflow-hidden z-0">
        <img src={orbit} alt={t('orbit')} className={`w-full h-full object-cover object-left ${zoomEarth && 'animate-zoom'}`} onAnimationEnd={() => navigate('/trials')} loading="lazy" />
      </div>

      <InitFade />

      <div className={`relative w-full h-screen backdrop-blur-sm overflow-hidden ${launchFade && 'animate-fade'}`} onAnimationEnd={(e) => e.animationName === 'fade' && setZoomEarth(true)}>
        <div className="relative w-full h-screen flex flex-col justify-between p-5 md:p-8 lg:px-12 lg:pb-14" style={{ translate: `${x}px ${y}px` }}>
          <div className="flex flex-col-reverse md:flex-row justify-between gap-y-4">
            <div className="self-end md:self-start">
              <OrbitInformations />
            </div>
            <OrbitFireteam />
          </div>
          <div className="flex flex-col xl:flex-row justify-between gap-12 md:gap-0">
            <div className="relative w-full xl:w-3/5">
              <div className="absolute -bottom-4 -left-2 w-14 h-36 md:h-40 lg:h-44 2xl:h-52 border border-white/10" />
              <div className="absolute -bottom-8 -left-2 w-14 h-2 bg-white/10 " />
              <div className="flex gap-x-5 pb-10">
                <OrbitModifierDiscord />
                <OrbitModifierTwitter />
              </div>
              <span className="text-sm md:text-base font-bold tracking-[.4em] uppercase text-white/80 whitespace-nowrap select-none">{t('orbit.title.header')}</span>
              <div className="w-full h-[1px] mt-1 mb-4 bg-white/60" />
              <h1 className="mb-3 font-neue-haas-display-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-wide uppercase text-white/90 whitespace-nowrap select-none">
                {t('orbit.title')}
              </h1>
              <span className="text-base md:text-lg lg:text-xl text-white/70 whitespace-nowrap select-none">
                {t('orbit.city')}
              </span>
            </div>
            <div className="w-full md:w-[474px] max-w-full self-end xl:self-center flex-col gap-y-1">
              <div className={`${launchFade && 'animate-fade-short'}`}>
                <OrbitLanguage />
              </div>
              <div className={`w-full p-0.5 border-2 border-transparent hover:border-white/80 transition-colors duration-300 ${launchFade && 'animate-fade-short'}`}>
                <button type="button" onClick={() => setLaunchFade(true)} className="flex justify-center items-center w-full h-14 bg-green border border-white/30 hover:border-white/80 transition-colors duration-300 animate-launch cursor-pointer">
                  <span className="text-lg md:text-xl lg:text-2xl uppercase tracking-[.4em] text-white/80 select-none">
                    {t('orbit.launch')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
