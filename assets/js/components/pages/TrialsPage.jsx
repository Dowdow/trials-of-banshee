import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBountiesToday, setCurrentBounty } from '../../actions/bounties';
import { useCurrentBounty } from '../../hooks/bounty';
import { useInterfaceMoveOnMouseMove } from '../../hooks/mouse';
import { useT } from '../../hooks/translations';
import { useUserAdmin } from '../../hooks/user';
import { ROUTES } from '../../utils/routes';
import EscapeButton from '../ui/clickable/EscapeButton';
import EscapeLink from '../ui/clickable/EscapeLink';
import InitFade from '../ui/InitFade';
import LeftClickLink from '../ui/clickable/LeftClickLink';
import NavBarBottom from '../ui/NavBarBottom';
import TrialsAudio from '../ui/trials/TrialsAudio';
import TrialsBounties from '../ui/trials/TrialsBounties';
import TrialsBountyPresentation from '../ui/trials/TrialsBountyPresentation';
import TrialsCollectionAndTriumphs from '../ui/trials/TrialsCollectionAndTriumphs';
import TrialsCompletedPopup from '../ui/trials/TrialsCompletedPopup';
import TrialsFlawless from '../ui/trials/TrialsFlawless';
import TrialsHistory from '../ui/trials/TrialsHistory';
import TrialsInformations from '../ui/trials/TrialsInformations';
import TrialsInput from '../ui/trials/TrialsInput';
import TrialsInputDamageType from '../ui/trials/TrialsInputDamageType';
import TrialsInputRarity from '../ui/trials/TrialsInputRarity';
import TrialsInputWeaponType from '../ui/trials/TrialsInputWeaponType';
import TrialsPossibleWeaponsPopup from '../ui/trials/TrialsPossibleWeaponsPopup';
import banshee from '../../../img/banshee.jpg';

export default function TrialsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const t = useT();

  const [fadeOut, setFadeOut] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [slideIn, setSlideIn] = useState(true);
  const [slideOut, setSlideOut] = useState(false);
  const [nextId, setNextId] = useState(null);

  useEffect(() => {
    dispatch(getBountiesToday());
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
    }
  };

  const handleCompletedExit = () => {
    setSlideOut(true);
    setNextId(null);
  };

  return (
    <div className={`overflow-hidden ${fadeOut && 'animate-fade-out'}`} onAnimationEnd={() => navigate(nextPage)}>
      <div className="absolute w-full h-screen overflow-hidden z-0">
        <img src={banshee} alt={t('banshee')} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <InitFade />
      <BansheeName />
      <RightPanel
        slideIn={slideIn}
        slideOut={slideOut}
        handleClickLink={handleClickLink}
        handleSlideAnimationEnd={handleSlideAnimationEnd}
        handleClickBounty={handleClickBounty}
      />
      <TrialsPossibleWeaponsPopup />
      <TrialsCompletedPopup onExit={handleCompletedExit} />
    </div>
  );
}

function BansheeName() {
  const t = useT();
  const { x, y } = useInterfaceMoveOnMouseMove();
  return (
    <div className="hidden md:block absolute md:bottom-52 xl:bottom-24 md:-left-32 xl:left-12 xl:pl-12 md:-rotate-90 xl:rotate-0" style={{ translate: `${x}px ${y}px` }}>
      <div className="ml-3 text-lg font-bold tracking-widest text-white text-shadow-sm shadow-light-grey/30 uppercase select-none">
        {t('gunsmith')}
      </div>
      <div className="w-full h-2 bg-white/90 text-shadow-sm shadow-light-grey/30 mb-2" />
      <div className="font-neue-haas-display-bold text-7xl uppercase text-white text-shadow-sm shadow-light-grey/30 select-none">
        {t('banshee')}
      </div>
      <div className="h-0.5 w-[95%] ml-3 bg-white/70 mt-3" />
    </div>
  );
}

function RightPanel({ slideIn, slideOut, handleClickLink, handleSlideAnimationEnd, handleClickBounty }) {
  const t = useT();

  const admin = useUserAdmin();
  const currentBounty = useCurrentBounty();
  const { x, y } = useInterfaceMoveOnMouseMove();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute -top-[10px] -right-[10px] h-[calc(100vh+20px)] w-[calc(100%+20px)] md:w-[calc(75%+10px)] lg:w-[calc(66%+10px)] xl:w-[calc(50%+10px)] flex flex-col backdrop-blur-lg" style={{ translate: `${x}px ${y}px` }}>
        <div className="w-full h-[30%] bg-blue/80 pt-[10px] px-[10px] md:pl-0">
          <div className={`w-full h-full ${slideIn ? 'animate-slide-in' : ''} ${slideOut ? 'animate-slide-out' : ''}`} onAnimationEnd={handleSlideAnimationEnd}>
            {currentBounty
              ? (
                <div className="h-full flex justify-between gap-x-10 xl:gap-x-12 p-5 lg:p-8 xl:p-10">
                  <div className="w-1/2 h-full flex flex-col justify-between">
                    <TrialsBountyPresentation />
                    <TrialsFlawless />
                  </div>
                  <div className="w-1/2">
                    <TrialsAudio />
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center p-5 lg:p-8 xl:p-10">
                  <TrialsCollectionAndTriumphs onLink={handleClickLink} />
                </div>
              )}
          </div>
        </div>
        <div className="w-full h-[70%] bg-blue/50 pb-[10px] px-[10px] md:pl-0">
          <div className={`w-full h-full ${slideIn && 'animate-slide-in'} ${slideOut && 'animate-slide-out'}`}>
            {currentBounty
              ? (
                <div className="flex flex-col gap-y-4 md:gap-y-6 xl:gap-y-8 p-5 lg:p-8 xl:p-10">
                  <div className="flex flex-col gap-y-4">
                    <TrialsInput />
                    <TrialsInputRarity />
                    <TrialsInputDamageType />
                    <TrialsInputWeaponType />
                  </div>
                  <TrialsHistory />
                </div>
              ) : (
                <div className="h-full flex flex-col gap-y-4 md:gap-y-10 xl:gap-y-12 p-5 lg:p-8 xl:p-10">
                  <TrialsBounties onClick={handleClickBounty} />
                  <TrialsInformations />
                </div>
              )}
          </div>
        </div>
      </div>
      <NavBarBottom>
        {currentBounty
          ? <EscapeButton onClick={() => handleClickBounty(null)} text={t('back')} />
          : (
            <>
              {admin && <LeftClickLink route={ROUTES.PANEL} onClick={(e) => handleClickLink(e, ROUTES.PANEL)} text="Panel" />}
              {admin && <LeftClickLink route={ROUTES.SOUNDS} onClick={(e) => handleClickLink(e, ROUTES.SOUNDS)} text={t('sounds')} />}
              <LeftClickLink route={ROUTES.WEAPONS} onClick={(e) => handleClickLink(e, ROUTES.WEAPONS)} text={t('weapons')} />
              <EscapeLink route={ROUTES.INDEX} onClick={(e) => handleClickLink(e, ROUTES.INDEX)} text={t('back')} />
            </>
          )}
      </NavBarBottom>
    </div>
  );
}

RightPanel.propTypes = {
  slideIn: PropTypes.bool.isRequired,
  slideOut: PropTypes.bool.isRequired,
  handleClickLink: PropTypes.func.isRequired,
  handleSlideAnimationEnd: PropTypes.func.isRequired,
  handleClickBounty: PropTypes.func.isRequired,
};
