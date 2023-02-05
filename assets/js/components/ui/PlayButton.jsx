import React, { useState } from 'react';
import PropTypes from 'prop-types';
import mouse from '../../../img/misc/mouse.png';

export default function PlayButton({ playing, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button type="button" onClick={onClick} className="relative flex justify-center items-center w-20 h-20 outline-none" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className={`absolute w-20 h-20 border animate-spin transition-colors duration-300 ${hover || playing ? 'border-white/80' : 'border-white/40'}`} />
      <div className={`absolute w-20 h-20 border animate-spin-back transition-colors duration-300 ${hover || playing ? 'border-white/80' : 'border-white/40'}`} />
      <div className={`absolute w-36 h-36 border rounded-full transition-colors duration-500 ${hover || playing ? 'border-white/70' : 'border-white/40'}`} />
      <div className={`absolute w-32 h-32 border rounded-full transition-colors duration-500 ${hover || playing ? 'border-white/70' : 'border-white/40'}`} />
      <div className="absolute w-[102px] h-[102px] animate-spin-big">
        <div className={`absolute top-0 left-0 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${hover || playing ? 'bg-white/90' : 'bg-white/40'}`} />
        <div className={`absolute top-0 right-0 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${hover || playing ? 'bg-white/90' : 'bg-white/40'}`} />
        <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${hover || playing ? 'bg-white/90' : 'bg-white/40'}`} />
        <div className={`absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${hover || playing ? 'bg-white/90' : 'bg-white/40'}`} />
      </div>
      <div className={`absolute w-16 h-16 border rounded-full transition-colors duration-300 ${hover ? 'bg-light-grey/70 border-white/50' : 'bg-light-grey/30 border-transparent'} ${playing && 'bg-purple/70 border-white/50'}`} />
      <img src={mouse} alt="Destiny mouse icon" className="absolute" />
    </button>
  );
}

PlayButton.propTypes = {
  playing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
