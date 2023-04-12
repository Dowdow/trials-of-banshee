import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useCurrentBounty } from '../../../hooks/bounty';
import { useT } from '../../../hooks/translations';
import { bountyNameFromType, BOUNTY_TYPE } from '../../../utils/bounties';
import { ENGRAMS, ENGRAM_IMAGES } from '../../../utils/collections';
import LeftClickButton from '../clickable/LeftClickButton';
import TwitterShareBounty from '../clickable/TwitterShareBounty';
import emptyEngram from '../../../../img/engram/empty_engram.svg';

export default function TrialsCompletedPopup({ onExit }) {
  const currentBounty = useCurrentBounty();
  const t = useT();
  const weapons = useSelector((state) => state.weapons);

  const [completedOut, setCompletedOut] = useState(false);

  const handleAnimationEnd = (e) => {
    if (e.animationName === 'fade-out') {
      onExit();
      setCompletedOut(false);
    }
  };

  if (!currentBounty?.completed) {
    return null;
  }

  const weapon = weapons.find((w) => w.id === currentBounty.history[currentBounty.history.length - 1]);

  return (
    <div className={`absolute top-0 left-0 w-full h-screen flex items-center bg-transparent backdrop-blur-sm overflow-hidden opacity-0 animate-completed-in ${completedOut && 'animate-completed-out'}`} onAnimationEnd={handleAnimationEnd}>
      <div className="w-full bg-dark-grey/70">
        <div className="w-full h-2 bg-white/50" />
        <div className="w-full flex flex-col md:flex-row">
          <div className="flex justify-center items-center md:w-1/2 bg-light-grey/50">
            <img className="w-full h-full object-cover" src={`https://bungie.net${weapon.screenshot}`} alt={t('weapon')} loading="lazy" />
          </div>
          <div className="flex flex-col grow">
            <div className="flex items-center p-3 lg:p-5 bg-light-grey/40 text-xl lg:text-3xl text-white/80 font-bold tracking-widest lg:tracking-[0.3em] uppercase">
              {t('trials.bounty.completed')}
            </div>
            <div className="flex flex-col gap-y-2 md:gap-y-4 p-3 lg:p-5 text-white/70 text-base lg:text-xl tracking-wide">
              <div>{t('bounty.done', { bounty: t(bountyNameFromType(currentBounty.type)) })}</div>
              <div className="flex flex-col gap-1.5">
                <div className="border-b-2 border-white/40">
                  {t('trials.bounty.perfect')}
                </div>
                <div className="w-5 h-5 p-0.5 border border-white/30">
                  <div className={`w-full h-full ${currentBounty.perfectMatch ? 'bg-light-green' : 'bg-red'}`} />
                </div>
              </div>
              {currentBounty.type !== BOUNTY_TYPE.DAILY && (
                <div className="flex flex-col gap-1.5">
                  <div className="border-b-2 border-white/40">
                    {t('trials.bounty.flawless')}
                  </div>
                  <div className="w-5 h-5 p-0.5 border border-white/30">
                    <div className={`w-full h-full ${currentBounty.flawless ? 'bg-light-green' : 'bg-red'}`} />
                  </div>
                </div>
              )}
              {currentBounty.loot ? (
                <div className="flex flex-col gap-3">
                  <div className="border-b-2 border-white/40">{t('trials.bounty.reward', { engram: t(ENGRAMS[currentBounty.loot]) })}</div>
                  <div className="relative w-24 h-24">
                    <div className="absolute w-24 h-24 border-2 border-white opacity-0 animate-engram-decoration-pop" />
                    <div className="absolute w-24 h-24 border-2 border-white rotate-45 opacity-0 animate-engram-decoration-pop-next" />
                    <img src={ENGRAM_IMAGES[currentBounty.loot]} alt={t(ENGRAMS[currentBounty.loot])} className="w-24 h-24 hover:brightness-125 transition-all duration-300 opacity-0 animate-engram-pop" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="border-b-2 border-white/40">{t('trials.bounty.reward.no')}</div>
                  <div className="flex gap-x-5 items-center">
                    <img src={emptyEngram} alt={t('emgram.empty')} className="w-16 md:w-24 h-16 md:h-24" />
                    <div className="text-sm md:text-base max-w-lg">
                      {t('trials.bounty.reward.no.description')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full py-2 flex justify-center gap-x-5 bg-dark-grey/60">
          <TwitterShareBounty />
          <LeftClickButton onClick={() => setCompletedOut(true)} text="O.K." />
        </div>
      </div>
    </div>
  );
}

TrialsCompletedPopup.propTypes = {
  onExit: PropTypes.func.isRequired,
};
