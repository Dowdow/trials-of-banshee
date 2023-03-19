import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTriumphsDefault } from '../../hooks/default';
import { useInterfaceMoveOnMouseMove } from '../../hooks/mouse';
import { useUserTriumphs } from '../../hooks/user';
import { ROUTES } from '../../utils/routes';
import EscapeLink from '../ui/clickable/EscapeLink';
import InitFade from '../ui/InitFade';
import NavBarBottom from '../ui/NavBarBottom';
import GunsmithSeal from '../ui/triumph/GunsmithSeal';
import Triumph from '../ui/triumph/Triumph';
import TriumphProgress from '../ui/triumph/TriumphProgress';

export default function TriumphsPage() {
  const navigate = useNavigate();
  const {
    aspiringBountiesDefault,
    aspiringBountiesGoal,
    bountiesDefault,
    bountiesGoal,
    perfectMatchesDefault,
    perfectMatchesGoal,
    trueGunsmithBountiesDefault,
    trueGunsmithBountiesGoal,
  } = useTriumphsDefault();
  const triumphs = useUserTriumphs();

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
            <GunsmithSeal />
          </div>
          <div className="hidden lg:block ml-10 border-r-2 border-white/10" />
          <div className="w-full lg:w-3/5 xl:w3/4 h-full grid grid-rows-triumph grid-cols-1 md:grid-cols-triumph gap-x-1.5">
            <div className="border-t-2 md:border-t-0 border-white/10" />
            <div className="md:border-t-2 border-white/10" />
            <div />
            <div className="hidden md:flex justify-center items-center bg-dark-grey/70 text-white/20">◀</div>
            <div className="grow overflow-y-hidden lg:overflow-y-scroll 2xl:overflow-y-hidden">
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-1.5">
                <Triumph
                  title="Collection Badge"
                  description="Collect all engrams by completing bounties"
                  badge
                  completed={triumphs.collectionBadge ?? false}
                />
                <TriumphProgress
                  title="Daily Bounties"
                  description="Complete 100 daily bounties"
                  completed={triumphs.bountiesClaimed ?? false}
                  value={triumphs.bounties ?? 0}
                  min={bountiesDefault}
                  max={bountiesGoal}
                />
                <TriumphProgress
                  title="Aspiring Gunsmith Bounties"
                  description="Complete successfully 25 aspiring gunsmith bounties"
                  completed={triumphs.aspiringBountiesClaimed ?? false}
                  value={triumphs.aspiringBounties ?? 0}
                  min={aspiringBountiesDefault}
                  max={aspiringBountiesGoal}
                />
                <TriumphProgress
                  title="True Gunsmith Bounties"
                  description="Complete successfully 10 true gunsmith bounties"
                  completed={triumphs.trueGunsmithBountiesCompleted ?? false}
                  value={triumphs.trueGunsmithBounties ?? 0}
                  min={trueGunsmithBountiesDefault}
                  max={trueGunsmithBountiesGoal}
                />
                <TriumphProgress
                  title="Perfect Matches"
                  description="Complete 75 bounties with a perfect weapon match"
                  completed={triumphs.perfectMatchesClaimed ?? false}
                  value={triumphs.perfectMatches ?? 0}
                  min={perfectMatchesDefault}
                  max={perfectMatchesGoal}
                />
                <Triumph
                  title="Secret Bounty"
                  description="Find and complete the secret bounty"
                  completed={triumphs.xurBounty ?? false}
                />
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center bg-dark-grey/70 text-white/20">▶</div>
          </div>
          <div className="hidden xl:block absolute top-16 left-16 w-3 h-3 border-b-2 border-r-2 border-white/10" />
          <div className="hidden xl:block absolute top-16 right-16 w-3 h-3 border-b-2 border-l-2 border-white/10" />
          <div className="hidden xl:block absolute bottom-24 left-16 w-3 h-3 border-t-2 border-r-2 border-white/10" />
          <div className="hidden xl:block absolute bottom-24 right-16 w-3 h-3 border-t-2 border-l-2 border-white/10" />
        </div>
      </div>
      <NavBarBottom>
        <EscapeLink route={ROUTES.TRIALS} onClick={(e) => handleClickLink(e, ROUTES.TRIALS)} text="Back" />
      </NavBarBottom>
    </div>
  );
}
