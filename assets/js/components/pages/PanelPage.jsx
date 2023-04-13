import React, { useEffect, useState } from 'react';
import { useT } from '../../hooks/translations';
import { useUserAdmin } from '../../hooks/user';
import { ROUTES, ROUTES_API } from '../../utils/routes';
import EscapeLink from '../ui/clickable/EscapeLink';
import LeftClickButton from '../ui/clickable/LeftClickButton';
import LeftClickLink from '../ui/clickable/LeftClickLink';

export default function PanelPage() {
  const admin = useUserAdmin();
  const t = useT();

  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [data]);

  const stream = async (route) => {
    const response = await fetch(route, { method: 'POST' });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let end = false;
    while (!end) {
      // eslint-disable-next-line no-await-in-loop
      const { value, done } = await reader.read();
      if (done) {
        end = true;
        break;
      }

      const chunk = decoder.decode(value);
      setData((prevData) => [...prevData, ...chunk.split('\n').filter((c) => c !== '')]);
    }
  };

  const handleClickDestinyWeaponsCache = async () => {
    stream(ROUTES_API.PANEL_CACHE);
  };

  const handleClickDestinyWeaponsParse = async () => {
    stream(ROUTES_API.PANEL_PARSE);
  };

  const handleClickDestinyWeaponsHide = async () => {
    stream(ROUTES_API.PANEL_HIDE);
  };

  const handleClickBountyCreate = async () => {
    stream(ROUTES_API.PANEL_BOUNTY);
  };

  if (!admin) return null;
  return (
    <div className="bg-dark min-h-screen">
      <div className="sticky top-0 flex justify-between items-center flex-wrap gap-3 md:gap-6 w-full bg-gray-dark p-3 md:p-5">
        <div className="flex items-center flex-wrap gap-3 md:gap-6">
          <div>
            <h1 className="mb-1 md:mb-3 font-neue-haas-display-bold text-5xl md:text-6xl text-white">Panel</h1>
            <div className="w-full h-0.5 bg-white/50" />
          </div>
          <div className="flex items-center flex-wrap gap-2 md:gap-6">
            <LeftClickButton text="Cache" onClick={handleClickDestinyWeaponsCache} />
            <LeftClickButton text="Parse" onClick={handleClickDestinyWeaponsParse} />
            <LeftClickButton text="Hide" onClick={handleClickDestinyWeaponsHide} />
            <LeftClickButton text="Bounty" onClick={handleClickBountyCreate} />
          </div>
        </div>
        <nav className="flex flex-wrap gap-3">
          <LeftClickLink route={ROUTES.SOUNDS} text={t('sounds')} />
          <LeftClickLink route={ROUTES.WEAPONS} text={t('weapons')} />
          <EscapeLink route={ROUTES.TRIALS} text={t('back')} />
        </nav>
      </div>
      <div className="container mx-auto p-4">
        <div className="w-full p-4 bg-gray-light text-lg text-white tracking-wider rounded">
          {data.map((line, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="flex gap-x-4">
              <div className="w-10 text-left">{`${index + 1}.`}</div>
              <div>{line}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
