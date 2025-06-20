import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserCollections } from '../../actions/user';
import { useCollectionEngramsDefault, useCollectionItemsDefault } from '../../hooks/default';
import { useInterfaceMoveOnPointerMove } from '../../hooks/pointer';
import { useT } from '../../hooks/translations';
import { useUserEngramsCollection, useUserItemsCollection } from '../../hooks/user';
import { ROUTES } from '../../utils/routes';
import CategoryTitle from '../ui/CategoryTitle';
import Engram from '../ui/engram/Engram';
import EscapeLink from '../ui/clickable/EscapeLink';
import InitFade from '../ui/InitFade';
import Item from '../ui/item/Item';
import NavBarBottom from '../ui/NavBarBottom';
import emptyEngram from '../../../img/engram/empty_engram.svg';
import packageImg from '../../../img/misc/package.svg';

export default function CollectionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const t = useT();

  const engrams = useCollectionEngramsDefault();
  const items = useCollectionItemsDefault();
  const userEngrams = useUserEngramsCollection();
  const userItems = useUserItemsCollection();

  const [fadeOut, setFadeOut] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const { x, y } = useInterfaceMoveOnPointerMove();

  useEffect(() => {
    dispatch(getUserCollections());
  }, []);

  const handleClickLink = (e, route) => {
    e.preventDefault();
    setNextPage(route);
    setFadeOut(true);
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${fadeOut && 'animate-fade-out'}`} onAnimationEnd={() => navigate(nextPage)}>
      <InitFade />
      <div className="relative w-full h-screen collection-gradient overflow-y-scroll xl:overflow-y-hidden noscrollbar">
        <div className="absolute -top-[10px] -left-[10px] w-[calc(100%+20px)] h-auto xl:h-[calc(100vh+20px)] flex flex-col xl:flex-row" style={{ translate: `${x}px ${y}px` }}>
          <div className="relative w-full xl:w-1/3 h-full flex bg-yellow/20 border-b xl:border-b-0 xl:border-r border-white/30 overflow-hidden">
            <img src={emptyEngram} alt={t('engram.empty')} className="absolute w-full xl:w-auto xl:h-[90%] self-center object-cover opacity-30" />
            <div className="w-28 xl:w-56 xl:h-full bg-yellow/60" />
            <div className="flex flex-col justify-center xl:items-center gap-y-3 xl:gap-y-20 py-6 md:pr-8 xl:py-0 px-4 xl:px-10">
              <h1 className="text-5xl font-bold text-white tracking-widest uppercase select-none">
                {t('collection')}
              </h1>
              <div className="hidden xl:flex justify-center items-center w-60 h-60 bg-gray-dark border-8 border-yellow rotate-45">
                <div className="flex justify-center items-center w-52 h-52 bg-gray-light border-4 border-yellow">
                  <div className="-rotate-45 select-none p-4">
                    <img src={packageImg} alt={t('collection')} className="w-full h-full" />
                  </div>
                </div>
              </div>
              <div className="text-white/70 font-bold tracking-wider">
                {t('collection.description')}
              </div>
            </div>
          </div>
          <div className="w-full xl:w-2/3 flex flex-col justify-center gap-y-10 px-10 xl:px-20 pt-[30px] pb-16 xl:pb-[30px] overflow-y-scroll noscrollbar">
            <div className="flex flex-col gap-y-5">
              <CategoryTitle title={t('items')} />
              <div className="grid grid-cols-items gap-5">
                {items.map((i) => <Item key={i} type={i} active={userItems[i] ?? false} />)}
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <CategoryTitle title={t('engrams')} />
              <div className="grid grid-cols-engrams gap-5">
                {engrams.map((e) => <Engram key={e} type={e} active={userEngrams[e] ?? false} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavBarBottom>
        <EscapeLink route={ROUTES.TRIALS} onClick={(e) => handleClickLink(e, ROUTES.TRIALS)} text={t('back')} />
      </NavBarBottom>
    </div>
  );
}
