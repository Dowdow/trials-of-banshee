import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useInterfaceMoveOnMouseMove } from '../../hooks/mouse';
import { useSeal, useTriumphs } from '../../hooks/user';
import { ROUTES } from '../../utils/routes';
import InitFade from '../ui/InitFade';
import KeyboardButton from '../ui/KeyboardButton';
import gunsmith from '../../../img/misc/gunsmith.png';
import triumphIcon from '../../../img/misc/triumph_gun.png';

export default function TriumphsPage() {
  const navigate = useNavigate();
  const { nb, total, percent, completed } = useSeal();
  const triumphs = useTriumphs();

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
                <div>Seal progress</div>
                <div>{`${nb}/${total}`}</div>
              </div>
              <div className="w-full h-2 mt-1 bg-white/20">
                <div className="h-2 bg-pink" style={{ width: `${percent}%` }} />
              </div>
              <div className={`p-2 mt-3 border-2 font-bold text-lg tracking-wider ${completed ? 'bg-pink/60 border-pink text-white/80' : 'bg-white/20 border-white/50 text-white/50'}`}>Gunsmith</div>
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
                <Triumph title="Collection Badge" description="Collect all engrams by completing bounties" badge completed={triumphs.collectionBadge ?? false} />
                <TriumphProgress title="Daily Bounties" description="Complete 100 daily bounties" value={triumphs.bounties ?? 0} min={0} max={100} />
                <TriumphProgress title="Aspiring Gunsmith Bounties" description="Complete successfully 25 aspiring gunsmith bounties" value={triumphs.aspiringBounties ?? 0} min={0} max={25} />
                <TriumphProgress title="True Gunsmith Bounties" description="Complete successfully 10 true gunsmith bounties" value={triumphs.trueGunsmithBounties ?? 0} min={0} max={10} />
                <TriumphProgress title="Perfect Matches" description="Complete 75 bounties with a perfect weapon match" value={triumphs.perfectMatches ?? 0} min={0} max={75} />
                <Triumph title="Secret Bounty" description="Find and complete the secret bounty" completed={triumphs.xurBounty ?? false} />
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

function Triumph({ title, description, badge = false, completed = false }) {
  return (
    <div className={`p-6 bg-white/10 border ${completed ? 'border-yellow' : 'border-white/30'}`}>
      <div className="flex items-center gap-2">
        <img src={badge ? gunsmith : triumphIcon} alt="Triumph Icon" className="w-8 h-8 object-cover" />
        <div className={`text-xl font-bold tracking-wider ${completed ? 'text-yellow' : 'text-white/70'}`}>{title}</div>
      </div>
      <div className={`w-full h-[1px] mt-2 mb-3 ${completed ? 'bg-yellow' : 'bg-white/50'}`} />
      <div className={`text-lg tracking-wide ${completed ? 'text-yellow' : 'text-white/50'}`}>{description}</div>
    </div>
  );
}

function TriumphProgress({ title, description, value = 0, min = 0, max = 100 }) {
  const completed = useMemo(() => value >= max, [value, max]);
  const percent = useMemo(() => Math.min(Math.max(100 * ((value - min) / (max - min)), 0), 100), [value, min, max]);
  return (
    <div className={`flex flex-col justify-between bg-white/10 border ${completed ? 'border-yellow' : 'border-white/30'}`}>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <img src={triumphIcon} alt="Triumph Icon" className="w-8 h-8 object-cover" />
          <div className={`text-xl font-bold tracking-wider ${completed ? 'text-yellow' : 'text-white/70'}`}>{title}</div>
        </div>
        <div className={`w-full h-[1px] mt-2 mb-3 ${completed ? 'bg-yellow' : 'bg-white/50'}`} />
        <div className={`text-lg tracking-wide ${completed ? 'text-yellow' : 'text-white/50'}`}>{description}</div>
      </div>
      <div className="w-full h-2 bg-white/30">
        <div className={`h-2 ${completed ? 'bg-yellow' : 'bg-white/70'}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

Triumph.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  badge: PropTypes.bool,
  completed: PropTypes.bool,
};

Triumph.defaultProps = {
  badge: false,
  completed: false,
};

TriumphProgress.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

TriumphProgress.defaultProps = {
  value: 0,
  min: 0,
  max: 100,
};
