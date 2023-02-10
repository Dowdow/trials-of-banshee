import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInterfaceMoveOnMouseMove } from '../../hooks/mouse';
import { ROUTES } from '../../utils/routes';
import InitFade from '../ui/InitFade';
import KeyboardButton from '../ui/KeyboardButton';
import triumphIcon from '../../../img/misc/triumph_gun.png';

export default function TriumphsPage() {
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
    <div className={`relative w-full h-screen overflow-hidden ${fadeOut && 'animate-fade-out'}`} onAnimationEnd={() => navigate(nextPage)}>
      <InitFade />
      <div className="absolute w-[200%] h-[200vh] -top-1/2 -left-1/2 triumph-background-gradient -skew-x-6 -skew-y-6" />
      <div className="relative w-full h-screen triumph-gradient overflow-y-scroll lg:overflow-hidden">
        <div className="relative w-full lg:h-screen flex flex-col lg:flex-row justify-center gap-y-10 gap-x-1.5 px-3 pt-6 pb-20 md:px-10 md:pt-10 xl:px-24 xl:pt-24 xl:pb-32" style={{ translate: `${x}px ${y}px` }}>
          <div className="w-full lg:w-2/5 xl:w-1/4 flex flex-col justify-between gap-y-10 border-t-2 border-white/10">
            <div>
              <div className="relative w-full flex justify-center mt-12 p-6">
                <div className="w-60 h-72 p-1 bg-dark-grey border-[12px] border-yellow rounded-b-full">
                  <div className="flex justify-center items-center w-full h-full border-[4px] border-yellow rounded-b-full text-9xl">
                    🔫
                  </div>
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20" />
                </div>
              </div>
              <div className="mt-10 text-4xl font-bold text-white tracking-widest uppercase">Gunsmith</div>
              <div className="mt-2 text-white/50 text-xl tracking-wide">Knowledge and precision are required to be a true Gunsmith. Prove yourself worth.</div>
            </div>
            <div>
              <div className="flex justify-between text-xl text-white/60 tracking-wider uppercase">
                <div>Progression du sceau</div>
                <div>4/6</div>
              </div>
              <div className="w-full h-2 mt-1 bg-white/20">
                <div className="w-3/4 h-2 bg-pink" />
              </div>
              <div className="p-2 mt-3 bg-white/20 border-2 border-white/50 font-bold text-lg text-white/50 tracking-wider">Gunsmith</div>
            </div>
          </div>
          <div className="hidden lg:block ml-10 border-r-2 border-white/10" />
          <div className="w-full lg:w-3/5 xl:w3/4 h-full grid grid-rows-triumph grid-cols-1 md:grid-cols-triumph gap-x-1.5">
            <div className="border-t-2 md:border-t-0 border-white/10" />
            <div className="md:border-t-2 border-white/10" />
            <div />
            <div className="hidden md:flex justify-center items-center bg-dark-grey/70 text-white/20">◀</div>
            <div className="grow overflow-y-hidden lg:overflow-y-scroll 2xl:overflow-y-hidden">
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="p-6 bg-white/10 border border-white/30">
                    <div className="flex items-center gap-2">
                      <img src={triumphIcon} alt="Triumph Icon" className="w-8 h-8 object-cover" />
                      <div className="text-xl font-bold text-white/70 tracking-wider">Daily Bounties</div>
                    </div>
                    <div className="w-full h-[1px] bg-white/50 mt-2 mb-3" />
                    <div className="text-lg text-white/50 tracking-wide">Complete 100 daily bounties</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center bg-dark-grey/70 text-white/20">▶</div>
          </div>
          <div className="absolute left-0 lg:left-auto bottom-0 lg:-bottom-4 w-full lg:w-[102%] p-2 lg:pt-2 lg:pb-6 lg:px-20 flex justify-end bg-dark-grey/70">
            <Link to={ROUTES.TRIALS} onClick={(e) => handleClickLink(e, ROUTES.TRIALS)} className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
              <KeyboardButton button="B" />
              <span className="text-xl tracking-wide text-white/80">Back</span>
            </Link>
          </div>
          <div className="hidden xl:block absolute top-16 left-16 w-3 h-3 border-b-2 border-r-2 border-white/10" />
          <div className="hidden xl:block absolute top-16 right-16 w-3 h-3 border-b-2 border-l-2 border-white/10" />
          <div className="hidden xl:block absolute bottom-24 left-16 w-3 h-3 border-t-2 border-r-2 border-white/10" />
          <div className="hidden xl:block absolute bottom-24 right-16 w-3 h-3 border-t-2 border-l-2 border-white/10" />
        </div>
      </div>
    </div>
  );
}
