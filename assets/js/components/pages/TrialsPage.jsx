import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterfaceMoveOnMouseMove } from '../../hooks/mouse';
import InitFade from '../ui/InitFade';
import TrialsBottom from '../ui/TrialsBottom';
import TrialsMiddle from '../ui/TrialsMiddle';
import TrialsTop from '../ui/TrialsTop';
import banshee from '../../../img/banshee.jpg';

export default function TrialsPage() {
  const navigate = useNavigate();

  const [fadeOut, setFadeOut] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const { x, y } = useInterfaceMoveOnMouseMove();

  const handleClickLink = (e, route) => {
    e.preventDefault();
    setNextPage(route);
    setFadeOut(true);
  };

  return (
    <div className={`${fadeOut && 'animate-fade-out'}`} onAnimationEnd={() => navigate(nextPage)}>
      <div className="absolute w-full h-screen overflow-hidden z-0">
        <img src={banshee} alt="Banshee" className="w-full h-full object-cover" />
      </div>

      <InitFade />

      <div className="absolute bottom-24 left-12 pl-12" style={{ transform: `translateX(${x}px) translateY(${y}px)` }}>
        <div className="ml-3 text-lg font-bold tracking-widest text-white drop-shadow-lg uppercase select-none">Gunsmith</div>
        <div className="w-full h-2 bg-white/90 drop-shadow-sm mb-2" />
        <div className="font-neue-haas-display-bold text-7xl uppercase text-white drop-shadow select-none">Banshee-44</div>
        <div className="h-0.5 w-[95%] ml-3 bg-white/70 mt-3" />
      </div>

      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute -top-3 left-1/2 w-[52%] h-[102vh] flex flex-col backdrop-blur-lg" style={{ transform: `translateX(${x}px) translateY(${y}px)` }}>
          <div className="w-full h-[30%] bg-blue/80 flex items-center pt-3 pr-20">
            <TrialsTop onLink={handleClickLink} />
          </div>
          <div className="w-full h-[63%] bg-blue/50 pr-20">
            <TrialsMiddle />
          </div>
          <div className="w-full h-[7%] bg-blue/30 pr-14">
            <TrialsBottom onLink={handleClickLink} />
          </div>
        </div>
      </div>
    </div>
  );
}
