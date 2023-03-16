import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBounties, setCurrentBounty } from '../../actions/bounties';
import { useCurrentBounty } from '../../hooks/bounty';
import { useInterfaceMoveOnMouseMove } from '../../hooks/mouse';
import { bountyNameFromType } from '../../utils/bounties';
import { ENGRAMS, ENGRAM_IMAGES } from '../../utils/collections';
import { ROUTES_API } from '../../utils/routes';
import InitFade from '../ui/InitFade';
import TrialsAudio from '../ui/TrialsAudio';
import TrialsBack from '../ui/TrialsBack';
import TrialsBountiesAndRules from '../ui/TrialsBountiesAndRules';
import TrialsCollectionAndTriumphs from '../ui/TrialsCollectionAndTriumphs';
import TrialsInputs from '../ui/TrialsInputs';
import TrialsLinks from '../ui/TrialsLinks';
import banshee from '../../../img/banshee.jpg';
import KeyboardButton from '../ui/KeyboardButton';

export default function TrialsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentBounty = useCurrentBounty();

  const [completedOut, setCompletedOut] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [slideIn, setSlideIn] = useState(true);
  const [slideOut, setSlideOut] = useState(false);
  const [nextId, setNextId] = useState(null);

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

  const handleClickBounty = (id) => {
    setSlideOut(true);
    setNextId(id);
  };

  const handleSlideAnimationEnd = (e) => {
    if (e.animationName === 'slide-in') {
      setSlideIn(false);
    }
    if (e.animationName === 'slide-out') {
      setSlideOut(false);
      dispatch(setCurrentBounty(nextId));
      setSlideIn(true);
      setCompletedOut(false);
    }
  };

  const handleCompletedOutAnimationEnd = (e) => {
    if (e.animationName === 'fade-out') {
      setSlideOut(true);
      setNextId(null);
    }
  };

  return (
    <div className={`overflow-hidden ${fadeOut && 'animate-fade-out'}`} onAnimationEnd={() => navigate(nextPage)}>
      <div className="absolute w-full h-screen overflow-hidden z-0">
        <img src={banshee} alt="Banshee" className="w-full h-full object-cover" loading="lazy" />
      </div>

      <InitFade />

      <div className="hidden md:block absolute md:bottom-52 xl:bottom-24 md:-left-32 xl:left-12 xl:pl-12 md:-rotate-90 xl:rotate-0" style={{ translate: `${x}px ${y}px` }}>
        <div className="ml-3 text-lg font-bold tracking-widest text-white text-shadow-sm shadow-light-grey/30 uppercase select-none">Gunsmith</div>
        <div className="w-full h-2 bg-white/90 text-shadow-sm shadow-light-grey/30 mb-2" />
        <div className="font-neue-haas-display-bold text-7xl uppercase text-white text-shadow-sm shadow-light-grey/30 select-none">Banshee-44</div>
        <div className="h-0.5 w-[95%] ml-3 bg-white/70 mt-3" />
      </div>

      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute -top-3 -left-2 md:left-1/4 lg:left-1/3 xl:left-1/2 w-[103%] md:w-[77%] lg:w-[68%] xl:w-[52%] h-[103%] flex flex-col backdrop-blur-lg" style={{ translate: `${x}px ${y}px` }}>
          <div className="w-full h-[30%] bg-blue/80 flex items-center px-6 md:pt-3 md:pl-10 md:pr-20">
            <div className={`w-full ${slideIn && 'animate-slide-in'} ${slideOut && 'animate-slide-out'}`} onAnimationEnd={handleSlideAnimationEnd}>
              {currentBounty
                ? <TrialsAudio />
                : <TrialsCollectionAndTriumphs onLink={handleClickLink} />}
            </div>
          </div>
          <div className="w-full h-[63%] bg-blue/50 px-6 pt-10 md:pl-10 md:pr-20">
            <div className={`w-full ${slideIn && 'animate-slide-in'} ${slideOut && 'animate-slide-out'}`}>
              {currentBounty
                ? <TrialsInputs />
                : <TrialsBountiesAndRules onClick={handleClickBounty} />}
            </div>
          </div>
          <div className="w-full h-[7%] bg-blue/30 px-6 md:pl-0 md:pr-14">
            <div className={`w-full ${slideIn && 'animate-slide-in'} ${slideOut && 'animate-slide-out'}`}>
              {currentBounty
                ? <TrialsBack onClick={handleClickBounty} />
                : <TrialsLinks onLink={handleClickLink} />}
            </div>
          </div>
        </div>
      </div>

      {currentBounty?.completed && (
        <div className={`absolute top-0 left-0 w-full h-screen flex items-center bg-transparent backdrop-blur-sm animate-completed-in ${completedOut && 'animate-completed-out'}`} onAnimationEnd={handleCompletedOutAnimationEnd}>
          <div className="w-full bg-dark-grey/70">
            <div className="w-full h-2 bg-white/50" />
            <div className="w-full flex">
              <div className="p-2 md:p-20 2xl:w-1/4 flex justify-center self-center bg-light-grey/50">
                <img src={ENGRAM_IMAGES[currentBounty.loot]} alt={ENGRAMS[currentBounty.loot]} className="w-24 h-24 min-w-[6rem] object-cover hover:brightness-125 transition-all duration-300" />
              </div>
              <div className="flex flex-col grow">
                <div className="p-2 md:p-5 bg-light-grey/40 text-xl md:text-3xl text-white/80 font-bold tracking-widest md:tracking-[0.3em] uppercase">
                  Bounty Completed
                </div>
                <div className="flex flex-col gap-y-2 p-2 md:p-5 text-white/70 text-base md:text-xl tracking-wide">
                  <div>{`${bountyNameFromType(currentBounty.type)} completed${currentBounty.perfectMatch ? ' with a perfect match' : ''}.`}</div>
                  <div>
                    {'Banshee rewards you with a '}
                    <b>{ENGRAMS[currentBounty.loot]}</b>
                    .
                  </div>
                  {currentBounty.succeeded && (<div>You also succeeded the bounty condition and have been rewarded in consequence.</div>)}
                </div>
              </div>
            </div>
            <div className="w-full py-2 flex justify-center bg-dark-grey/60">
              <button type="button" onClick={() => setCompletedOut(true)} className="flex items-center gap-2 px-1 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
                <KeyboardButton button="K" />
                <span className="text-2xl tracking-wide text-white/80">O.K.</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
