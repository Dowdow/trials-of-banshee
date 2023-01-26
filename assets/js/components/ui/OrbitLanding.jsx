import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InitFade from './InitFade';
import { useInterfaceMoveOnMouseMove } from '../../hooks/mouse';
import orbit from '../../../img/orbit.jpg';

export default function OrbitLanding({ onEnd }) {
  const [launchFade, setLaunchFade] = useState(false);
  const [zoomEarth, setZoomEarth] = useState(false);

  const { x, y } = useInterfaceMoveOnMouseMove();
  return (
    <>
      <div className="absolute w-full h-screen overflow-hidden z-0">
        <img src={orbit} alt="Orbit" className={`w-full h-full object-cover ${zoomEarth && 'animate-zoom'}`} onAnimationEnd={() => onEnd()} />
      </div>

      <InitFade />

      <div className={`relative w-full h-screen backdrop-blur-sm overflow-hidden ${launchFade && 'animate-fade'}`} onAnimationEnd={(e) => e.animationName === 'fade' && setZoomEarth(true)}>
        <div className="relative w-full h-screen" style={{ transform: `translateX(${x}px) translateY(${y}px)` }}>
          <div className="absolute bottom-0 left-0 w-full pl-12 pb-24">
            <div className="absolute bottom-20 left-10 w-14 h-52 border border-white/10" />
            <div className="absolute bottom-16 left-10 w-14 h-2 bg-white/10 " />
            <span className="font-bold tracking-[.4em] uppercase text-white/80 select-none">High End PVE</span>
            <div className="w-3/5 h-[1px] mt-1 mb-4 bg-white/60" />
            <h1 className="mb-3 font-neue-haas-display-bold text-8xl tracking-wide uppercase text-white/90 select-none">Trials of Banshee</h1>
            <span className="text-xl text-white/70 select-none">The Last City</span>
          </div>
          <div className={`absolute bottom-[9.7rem] right-12 border-2 border-transparent hover:border-white/80 transition-colors duration-300 p-0.5 ${launchFade && 'animate-fade-short'}`}>
            <button type="button" onClick={() => setLaunchFade(true)} className="flex justify-center items-center w-[30rem] h-14 bg-green border border-white/30 hover:border-white/80 transition-colors duration-300 animate-launch cursor-pointer">
              <span className="text-2xl uppercase tracking-[.4em] text-white/80 select-none">Launch</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

OrbitLanding.propTypes = {
  onEnd: PropTypes.func.isRequired,
};
