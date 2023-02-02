import React, { useRef, useState } from 'react';
import { useCurrentBounty } from '../../hooks/bounty';
import { bountyNameFromType } from '../../utils/bounties';

export default function TrialsAudio() {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);

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
    <div className="w-full ml-10">
      <div>
        <h2 className="text-2xl tracking-wide text-white/70 uppercase select-none">{bountyNameFromType(currentBounty.type)}</h2>
        <div className="w-full h-0.5 bg-white/60" />
      </div>
      <div className="flex mt-10">
        <audio ref={audioRef} src={`/uploads/sounds/${currentBounty.audio}`} preload="auto" onEnded={() => setPlaying(false)}>
          <track kind="captions" />
        </audio>
        <button type="button" onClick={handlePlay} className={`box-border w-0 h-[74px] border-l-[60px] border-r-0 border-transparent border-l-white/80 will-change-[border-width] transition-all duration-200 ${playing ? 'border-double border-y-0' : 'border-solid border-y-[37px]'} outline-none`} />
      </div>
    </div>
  );
}
