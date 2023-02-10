import React, { useRef, useState } from 'react';
import { WEAPON_DAMAGE_TYPE_IMAGE, WEAPON_DAMAGE_TYPE_NAME, WEAPON_RARITY_IMAGE, WEAPON_RARITY_NAME, WEAPON_TYPE_NAME } from '../../utils/weapons';
import { useCurrentBounty } from '../../hooks/bounty';
import { bountyNameFromType } from '../../utils/bounties';
import PlayButton from './PlayButton';

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
    <div className="w-full">
      <div>
        <h2 className="text-xl md:text-2xl tracking-wide text-white/70 uppercase select-none">{bountyNameFromType(currentBounty.type)}</h2>
        <div className="w-full h-0.5 bg-white/60" />
      </div>
      <div className="flex justify-between gap-16">
        <div className="mt-12 ml-8">
          <audio ref={audioRef} src={`/uploads/sounds/${currentBounty.audio}`} preload="auto" onEnded={() => setPlaying(false)}>
            <track kind="captions" />
          </audio>
          <PlayButton playing={playing} onClick={handlePlay} />
        </div>
        <div className="flex items-start flex-wrap gap-3 mt-2.5 text-lg">
          {currentBounty.clues.rarity ? (
            <div className="flex items-center gap-1 pr-1 text-white/70 border border-white/70 select-none">
              <img src={WEAPON_RARITY_IMAGE[currentBounty.clues.rarity]} alt={WEAPON_RARITY_NAME[currentBounty.clues.rarity]} className="w-8 h-8" />
              <div className="text-white/70">{WEAPON_RARITY_NAME[currentBounty.clues.rarity]}</div>
            </div>
          ) : (
            <div className="px-1 py-0.5 text-white/70 border border-white/70 select-none">Clue #1</div>
          )}
          {currentBounty.clues.damageType ? (
            <div className="flex items-center gap-1 pr-1 text-white/70 border border-white/70 select-none">
              <img src={WEAPON_DAMAGE_TYPE_IMAGE[currentBounty.clues.damageType]} alt={WEAPON_DAMAGE_TYPE_NAME[currentBounty.clues.damageType]} className="w-8 h-8" />
              <div className="text-white/70">{WEAPON_DAMAGE_TYPE_NAME[currentBounty.clues.damageType]}</div>
            </div>
          ) : (
            <div className="px-1 py-0.5 text-white/70 border border-white/70 select-none">Clue #2</div>
          )}
          {currentBounty.clues.weaponType ? (
            <div className="px-1 py-0.5 text-white/70 border border-white/70 select-none">{WEAPON_TYPE_NAME[currentBounty.clues.weaponType]}</div>
          ) : (
            <div className="px-1 py-0.5 text-white/70 border border-white/70 select-none">Clue #3</div>
          )}
        </div>
      </div>
    </div>
  );
}
