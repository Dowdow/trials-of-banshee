import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBounties } from '../../actions/bounties';
import { useCurrentBounty } from '../../hooks/bounty';
import { useInterfaceMoveOnMouseMove } from '../../hooks/mouse';
import { ROUTES_API } from '../../utils/routes';
import InitFade from '../ui/InitFade';
import TrialsAudio from '../ui/TrialsAudio';
import TrialsBack from '../ui/TrialsBack';
import TrialsBountiesAndRules from '../ui/TrialsBountiesAndRules';
import TrialsCollectionAndTriumphs from '../ui/TrialsCollectionAndTriumphs';
import TrialsInputs from '../ui/TrialsInputs';
import TrialsLinks from '../ui/TrialsLinks';
import banshee from '../../../img/banshee.jpg';

export default function TrialsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentBounty = useCurrentBounty();

  const [fadeOut, setFadeOut] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const { x, y } = useInterfaceMoveOnMouseMove();

  useEffect(() => {
    fetch(ROUTES_API.BOUNTIES_TODAY)
      .then((response) => response.json())
      .then((data) => dispatch(setBounties(data.items)));
  }, []);

  const handleClickLink = (e, route) => {
    e.preventDefault();
    setNextPage(route);
    setFadeOut(true);
  };

  return (
    <div className={`${fadeOut && 'animate-fade-out'}`} onAnimationEnd={() => navigate(nextPage)}>
      <div className="absolute w-full h-screen overflow-hidden z-0">
        <img src={banshee} alt="Banshee" className="w-full h-full object-cover" loading="lazy" />
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
            {currentBounty
              ? <TrialsAudio />
              : <TrialsCollectionAndTriumphs onLink={handleClickLink} />}
          </div>
          <div className="w-full h-[63%] bg-blue/50 pr-20">
            {currentBounty
              ? <TrialsInputs />
              : <TrialsBountiesAndRules />}
          </div>
          <div className="w-full h-[7%] bg-blue/30 pr-14">
            {currentBounty
              ? <TrialsBack />
              : <TrialsLinks onLink={handleClickLink} />}
          </div>
        </div>
      </div>
    </div>
  );
}
