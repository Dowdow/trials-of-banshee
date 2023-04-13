import React, { useRef, useState } from 'react';
import { useCurrentBounty } from '../../../hooks/bounty';
import { useT } from '../../../hooks/translations';
import emptyEngram from '../../../../img/engram/empty_engram.svg';
import mouse from '../../../../img/misc/mouse.png';

export default function TrialsAudio() {
  const audioRef = useRef();
  const t = useT();

  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);

  const currentBounty = useCurrentBounty();

  const handlePlay = () => {
    if (playing) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  if (currentBounty === null) return null;

  return (
    <section className="w-full h-full flex justify-center items-center">
      <audio ref={audioRef} src={`/uploads/sounds/${currentBounty.audio}`} preload="auto" onEnded={() => setPlaying(false)}>
        <track kind="captions" />
      </audio>
      <img src={emptyEngram} alt={t('engram.empty')} className={`absolute w-28 h-28 object-contain transition-colors duration-500 ${hover || playing ? 'opacity-50' : 'opacity-30'}`} />
      <button type="button" onClick={handlePlay} className="relative flex justify-center items-center w-20 h-20" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className={`absolute w-28 h-28 border animate-spin transition-colors duration-300 ${hover || playing ? 'border-white/80' : 'border-white/40'}`} />
        <div className={`absolute w-28 h-28 border animate-spin-back transition-colors duration-300 ${hover || playing ? 'border-white/80' : 'border-white/40'}`} />
        <div className={`absolute w-48 h-48 border rounded-full transition-colors duration-500 ${hover || playing ? 'border-white/70' : 'border-white/40'}`} />
        <div className={`absolute w-44 h-44 border rounded-full transition-colors duration-500 ${hover || playing ? 'border-white/70' : 'border-white/40'}`} />
        <div className="absolute w-[135px] h-[135px] animate-spin-big">
          <div className={`absolute top-0 left-0 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${hover || playing ? 'bg-white/90' : 'bg-white/40'}`} />
          <div className={`absolute top-0 right-0 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${hover || playing ? 'bg-white/90' : 'bg-white/40'}`} />
          <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${hover || playing ? 'bg-white/90' : 'bg-white/40'}`} />
          <div className={`absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${hover || playing ? 'bg-white/90' : 'bg-white/40'}`} />
        </div>
        <div className={`absolute w-16 h-16 border rounded-full transition-colors duration-300 ${hover ? 'bg-gray-light border-white/50' : 'bg-gray-light/80 border-transparent'} ${playing && 'bg-purple border-white/50'}`} />
        <img src={mouse} alt={t('click.left')} className="absolute" />
      </button>
    </section>
  );
}
