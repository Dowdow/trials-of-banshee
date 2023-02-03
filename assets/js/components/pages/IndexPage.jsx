import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/user';
import { useInterfaceMoveOnMouseMove } from '../../hooks/mouse';
import { useAuthenticated, useUser } from '../../hooks/user';
import { ROUTES, ROUTES_API } from '../../utils/routes';
import InitFade from '../ui/InitFade';
import orbit from '../../../img/orbit.png';
import defaultEmblem from '../../../img/emblem/default_emblem.jpg';

export default function IndexPage() {
  const authenticated = useAuthenticated();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useUser();

  const [launchFade, setLaunchFade] = useState(false);
  const [zoomEarth, setZoomEarth] = useState(false);

  const { x, y } = useInterfaceMoveOnMouseMove();

  useEffect(() => {
    if (authenticated) {
      fetch(ROUTES_API.USER)
        .then((response) => response.json())
        .then((data) => dispatch(setUser(data)));
    }
  }, []);

  return (
    <>
      <div className="absolute w-full h-screen overflow-hidden z-0">
        <img src={orbit} alt="Orbit" className={`w-full h-full object-cover ${zoomEarth && 'animate-zoom'}`} onAnimationEnd={() => navigate('/trials')} />
      </div>

      <InitFade />

      <div className={`relative w-full h-screen backdrop-blur-sm overflow-hidden ${launchFade && 'animate-fade'}`} onAnimationEnd={(e) => e.animationName === 'fade' && setZoomEarth(true)}>
        <div className="relative w-full h-screen flex flex-col justify-between p-5 md:p-8 lg:px-12 lg:pb-14" style={{ transform: `translateX(${x}px) translateY(${y}px)` }}>
          <div className="flex flex-col-reverse md:flex-row justify-between">
            <div>
              <button type="button">I</button>
            </div>
            <div className="flex flex-col">
              <div className="text-sm md:text-base font-bold tracking-[.4em] uppercase text-white/80 select-none">Fireteam</div>
              <div className="w-full h-[1px] bg-white/60" />
              <div className="w-full md:w-[474px] mt-1">
                {authenticated ? (
                  <div className="relative w-full h-24">
                    <img src={user.emblemBackgroundPath ? `https://bungie.net${user.emblemBackgroundPath}` : defaultEmblem} alt="Character Emblem" className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-24">
                      <div className="text-2xl font-bold text-white tracking-wider drop-shadow-xl">{user.displayName ? user.displayName : 'Guardian'}</div>
                      <div className="text-xl font-bold text-white/80 tracking-wider drop-shadow-xl">Clan</div>
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
          </div>
          <div className="flex flex-col xl:flex-row justify-between gap-12 md:gap-0">
            <div className="relative w-full xl:w-3/5">
              <div className="absolute -bottom-4 -left-2 w-14 h-36 md:h-40 lg:h-44 2xl:h-52 border border-white/10" />
              <div className="absolute -bottom-8 -left-2 w-14 h-2 bg-white/10 " />
              <span className="text-sm md:text-base font-bold tracking-[.4em] uppercase text-white/80 whitespace-nowrap select-none">High End PVE</span>
              <div className="w-full h-[1px] mt-1 mb-4 bg-white/60" />
              <h1 className="mb-3 font-neue-haas-display-bold text-3xl md:text-5xl lg:text-6xl 2xl:text-8xl tracking-wide uppercase text-white/90 whitespace-nowrap select-none">Trials of Banshee</h1>
              <span className="text-base md:text-lg lg:text-xl text-white/70 whitespace-nowrap select-none">The Last City</span>
            </div>
            <div className={`self-end xl:self-center w-full md:w-[474px] max-w-full border-2 border-transparent hover:border-white/80 transition-colors duration-300 p-0.5 ${launchFade && 'animate-fade-short'}`}>
              <button type="button" onClick={() => setLaunchFade(true)} className="flex justify-center items-center w-full h-14 bg-green border border-white/30 hover:border-white/80 transition-colors duration-300 animate-launch cursor-pointer">
                <span className="text-lg md:text-xl lg:text-2xl uppercase tracking-[.4em] text-white/80 select-none">Launch</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
