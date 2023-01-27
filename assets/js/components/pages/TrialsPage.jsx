import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterfaceMoveOnMouseMove } from '../../hooks/mouse';
import InitFade from '../ui/InitFade';
import KeyboardButton from '../ui/KeyboardButton';
import banshee from '../../../img/banshee.jpg';

export default function TrialsPage() {
  const navigate = useNavigate();

  const [zoomOut, setZoomOut] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const { x, y } = useInterfaceMoveOnMouseMove();

  const handleClickLink = (e, route) => {
    e.preventDefault();
    setNextPage(route);
    setZoomOut(true);
  };

  return (
    <div className={`${zoomOut && 'animate-fade-out'}`} onAnimationEnd={() => navigate(nextPage)}>
      <div className="absolute w-full h-screen overflow-hidden z-0">
        <img src={banshee} alt="Banshee" className="w-full h-full object-cover" />
      </div>

      <InitFade />

      <div className="absolute bottom-24 left-12 pl-12" style={{ transform: `translateX(${x}px) translateY(${y}px)` }}>
        <div className="font-neue-haas-display-bold text-7xl uppercase text-white/90 select-none">Banshee-44</div>
      </div>

      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute -top-3 left-1/2 w-[52%] h-[102vh] flex flex-col backdrop-blur-lg" style={{ transform: `translateX(${x}px) translateY(${y}px)` }}>
          <div className="w-full h-[30%] bg-blue/80" />
          <div className="w-full h-[63%] bg-blue/50" />
          <div className="flex justify-end items-center gap-3 w-full h-[7%] pr-14 bg-blue/30">
            <a href="/weapons" onClick={(e) => handleClickLink(e, '/weapons')} className="flex items-center gap-2 px-1 border-2 border-transparent hover:border-white/70">
              <KeyboardButton button="W" />
              <span className="text-2xl tracking-wide text-white/80">Weapons stock</span>
            </a>
            <a href="/" onClick={(e) => handleClickLink(e, '/')} className="flex items-center gap-2 px-1 border-2 border-transparent hover:border-white/70">
              <KeyboardButton button="O" />
              <span className="text-2xl tracking-wide text-white/80">Back to Orbit</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
