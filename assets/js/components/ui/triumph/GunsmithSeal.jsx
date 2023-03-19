import React from 'react';
import { useUserSeal } from '../../../hooks/user';

export default function GunsmithSeal() {
  const { nb, total, percent, completed } = useUserSeal();
  return (
    <div>
      <div className="flex justify-between text-xl text-white/60 tracking-wider uppercase">
        <div>Seal progress</div>
        <div>{`${nb}/${total}`}</div>
      </div>
      <div className="w-full h-2 mt-1 bg-white/20">
        <div className="h-2 bg-pink" style={{ width: `${percent}%` }} />
      </div>
      <div className={`p-2 mt-3 border-2 font-bold text-lg tracking-wider ${completed ? 'bg-pink/60 border-pink text-white/80' : 'bg-white/20 border-white/50 text-white/50'}`}>Gunsmith</div>
    </div>
  );
}
