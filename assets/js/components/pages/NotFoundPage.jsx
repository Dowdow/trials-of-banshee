import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBountiesToday } from '../../actions/bounties';
import { getUser } from '../../actions/user';
import { useCanSeeXur } from '../../hooks/bounty';
import { useInterfaceMoveOnPointerMove } from '../../hooks/pointer';
import { useT } from '../../hooks/translations';
import { useUserAuthenticated } from '../../hooks/user';
import { ROUTES } from '../../utils/routes';
import EscapeLink from '../ui/clickable/EscapeLink';
import EternityNotFound from '../ui/eternity/EternityNotFound';
import EternityXur from '../ui/eternity/EternityXur';
import InitFade from '../ui/InitFade';
import NavBarBottom from '../ui/NavBarBottom';
import eternity from '../../../img/eternity.jpg';
import xur from '../../../img/misc/xur.png';

export default function NotFoundPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const t = useT();

  const { x, y } = useInterfaceMoveOnPointerMove();

  const [fadeOut, setFadeOut] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const authenticated = useUserAuthenticated();
  const canSeeXur = useCanSeeXur();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getBountiesToday());
  }, []);

  const handleClickLink = (e, route) => {
    e.preventDefault();
    setNextPage(route);
    setFadeOut(true);
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${fadeOut && 'animate-fade-out'}`} onAnimationEnd={() => navigate(nextPage)}>
      <div className="absolute w-full h-screen overflow-hidden">
        <img src={eternity} alt={t('eternity')} className="w-full h-full object-cover object-center" loading="lazy" />
      </div>
      <InitFade />
      <div className="absolute -top-[10px] -right-[10px] h-[calc(100vh+20px)] w-[calc(100%+20px)] md:w-[calc(75%+10px)] lg:w-[calc(66%+10px)] xl:w-[calc(50%+10px)] flex flex-col backdrop-blur-lg" style={{ translate: `${x}px ${y}px` }}>
        <div className="w-full h-full bg-gray-light/70 py-[10px] px-[10px] md:pl-0">
          <div className="p-5 lg:p-8 xl:p-10">
            {authenticated && canSeeXur ? <EternityXur /> : <EternityNotFound />}
          </div>
        </div>
      </div>
      {authenticated && canSeeXur ? <img src={xur} alt="" className="absolute bottom-0 left-0 h-1/4 md:h-1/2 xl:h-2/3" /> : null}
      <NavBarBottom>
        <EscapeLink route={ROUTES.INDEX} onClick={(e) => handleClickLink(e, ROUTES.INDEX)} text={t('eternity.back')} />
      </NavBarBottom>
    </div>
  );
}
