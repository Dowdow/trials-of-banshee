import React, { useState } from 'react';
import banshee from '../../../img/banshee.jpg';

export default function Trials() {
  const [initFade, setInitFade] = useState(true);

  return (
    <>
      <div className="absolute w-full h-screen overflow-hidden z-0">
        <img src={banshee} alt="Banshee" className="w-full h-full object-cover" />
      </div>

      {initFade && <div className="absolute w-full h-screen bg-black backdrop-blur-lg animate-fade z-10" onAnimationEnd={() => setInitFade(false)} />}

      <div className="absolute bottom-24 left-12 pl-12">
        <div className="font-neue-haas-display-bold text-7xl uppercase text-white/90 select-none">Banshee-44</div>
      </div>
    </>
  );
}
