import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterfaceMoveOnMouseMove } from '../../hooks/mouse';
import { useEngramCollection } from '../../hooks/user';
import { ROUTES } from '../../utils/routes';
import Engram from '../ui/engram/Engram';
import EscapeLink from '../ui/clickable/EscapeLink';
import InitFade from '../ui/InitFade';
import NavBarBottom from '../ui/NavBarBottom';
import emptyEngram from '../../../img/engram/empty_engram.svg';

export default function CollectionPage() {
  const engrams = useEngramCollection();
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
      <div className="relative w-full h-screen collection-gradient overflow-y-scroll lg:overflow-hidden noscrollbar">
        <div className="relative flex flex-col lg:flex-row w-[105%] lg:w-[102%] h-auto lg:h-[102%] -mt-3 -ml-3" style={{ translate: `${x}px ${y}px` }}>
          <div className="relative w-full lg:w-1/3 h-full flex bg-yellow/20 border-b lg:border-b-0 lg:border-r border-white/30 overflow-hidden">
            <img src={emptyEngram} alt="Empty engram" className="absolute w-full lg:w-auto lg:h-[90%] self-center object-cover opacity-30" />
            <div className="w-28 lg:w-56 lg:h-full bg-yellow/60" />
            <div className="flex flex-col justify-center lg:items-center gap-y-3 lg:gap-y-20 py-6 md:pr-8 lg:py-0 px-4 lg:px-10">
              <h1 className="text-5xl font-bold text-white tracking-widest uppercase select-none">Collection</h1>
              <div className="hidden lg:flex justify-center items-center w-60 h-60 bg-dark-grey border-8 border-yellow rotate-45">
                <div className="flex justify-center items-center w-52 h-52 bg-light-grey border-4 border-yellow">
                  <div className="text-9xl -rotate-45 select-none">
                    📦
                  </div>
                </div>
              </div>
              <div className="text-white/70 font-bold tracking-wider">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit quia pariatur voluptatum officiis similique facere maxime, dicta et, distinctio excepturi modi accusantium explicabo laudantium neque non cumque sed eaque beatae!
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3 flex justify-center items-center pb-16 lg:pb-0 overflow-y-scroll noscrollbar">
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-7 gap-10 p-5 lg:pl-10 lg:pr-14">
              <Engram type="bestOfY1Engram" active={engrams.bestOfY1Engram ?? false} />
              <Engram type="brightEngram" active={engrams.brightEngram ?? false} />
              <Engram type="commonEngram" active={engrams.commonEngram ?? false} />
              <Engram type="crimsonEngram" active={engrams.crimsonEngram ?? false} />
              <Engram type="crucibleEngram" active={engrams.crucibleEngram ?? false} />
              <Engram type="dawningEngram" active={engrams.dawningEngram ?? false} />
              <Engram type="ephemeralEngram" active={engrams.ephemeralEngram ?? false} />
              <Engram type="etchedEngram" active={engrams.etchedEngram ?? false} />
              <Engram type="eververseEngram" active={engrams.eververseEngram ?? false} />
              <Engram type="exoticEngram" active={engrams.exoticEngram ?? false} />
              <Engram type="fondMemoriesEngram" active={engrams.fondMemoriesEngram ?? false} />
              <Engram type="gambitEngram" active={engrams.gambitEngram ?? false} />
              <Engram type="illuminatedEngram" active={engrams.illuminatedEngram ?? false} />
              <Engram type="ironBannerEngram" active={engrams.ironBannerEngram ?? false} />
              <Engram type="jubilantEngram" active={engrams.jubilantEngram ?? false} />
              <Engram type="legendaryEngram" active={engrams.legendaryEngram ?? false} />
              <Engram type="luminousEngram" active={engrams.luminousEngram ?? false} />
              <Engram type="mnemonicEngram" active={engrams.mnemonicEngram ?? false} />
              <Engram type="nostalgicEngram" active={engrams.nostalgicEngram ?? false} />
              <Engram type="notoriousEngram" active={engrams.notoriousEngram ?? false} />
              <Engram type="primeEngram" active={engrams.primeEngram ?? false} />
              <Engram type="prototypeEngram" active={engrams.prototypeEngram ?? false} />
              <Engram type="rareEngram" active={engrams.rareEngram ?? false} />
              <Engram type="solsticeEngram" active={engrams.solsticeEngram ?? false} />
              <Engram type="spiderSpecialEngram" active={engrams.spiderSpecialEngram ?? false} />
              <Engram type="steadfastEngram" active={engrams.steadfastEngram ?? false} />
              <Engram type="trialsEngram" active={engrams.trialsEngram ?? false} />
              <Engram type="umbralEngram" active={engrams.umbralEngram ?? false} />
              <Engram type="unknownEngram" active={engrams.unknownEngram ?? false} />
              <Engram type="winterdriftEngram" active={engrams.winterdriftEngram ?? false} />
            </div>
          </div>
        </div>
      </div>
      <NavBarBottom>
        <EscapeLink route={ROUTES.TRIALS} onClick={(e) => handleClickLink(e, ROUTES.TRIALS)} text="Back" />
      </NavBarBottom>
    </div>
  );
}
