import React from 'react';
import InitFade from './InitFade';
import banshee from '../../../img/banshee.jpg';

export default function Trials() {
  return (
    <>
      <div className="absolute w-full h-screen overflow-hidden z-0">
        <img src={banshee} alt="Banshee" className="w-full h-full object-cover" />
      </div>

      <InitFade />

      <div className="absolute bottom-24 left-12 pl-12">
        <div className="font-neue-haas-display-bold text-7xl uppercase text-white/90 select-none">Banshee-44</div>
      </div>
    </>
  );
}
