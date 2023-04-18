import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import { setQuery, setType } from '../../actions/soundFilters';
import { getSounds } from '../../actions/sounds';
import { useLocale, useT } from '../../hooks/translations';
import { useUserAdmin } from '../../hooks/user';
import { ROUTES } from '../../utils/routes';
import { WEAPON_TYPE, WEAPON_TYPE_IMAGE, WEAPON_TYPE_NAME } from '../../utils/weapons';
import EscapeLink from '../ui/clickable/EscapeLink';
import LeftClickLink from '../ui/clickable/LeftClickLink';
import WeaponIcon from '../ui/weapon/WeaponIcon';

export default function SoundsPage() {
  const admin = useUserAdmin();
  const dispatch = useDispatch();
  const t = useT();

  const { query, type } = useSelector((state) => state.soundFilters);

  useEffect(() => {
    if (admin) {
      dispatch(getSounds());
    }
  }, []);

  const handleQuery = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const handleType = (e) => {
    dispatch(setType(parseInt(e.target.value, 10)));
  };

  if (!admin) return null;
  return (
    <div className="bg-dark min-h-screen">
      <div className="sticky top-0 flex justify-between items-center flex-wrap gap-3 md:gap-6 w-full bg-gray-dark p-3 md:p-5 z-10">
        <div className="flex items-center flex-wrap gap-3 md:gap-6">
          <div>
            <h1 className="mb-1 md:mb-3 font-neue-haas-display-bold text-5xl md:text-6xl text-white">
              {t('sounds')}
            </h1>
            <div className="w-full h-0.5 bg-white/50" />
          </div>
          <div className="flex items-center flex-wrap gap-2 md:gap-6">
            <input type="text" value={query} onChange={handleQuery} className="p-2 text-lg bg-gray-light text-white" placeholder="Search a sound" />
            <select value={type} onChange={handleType} className="p-2 text-lg bg-gray-light text-white">
              <option value={0}>{t('weapons.filters.weapon.all')}</option>
              <option value={WEAPON_TYPE.AUTO}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.AUTO])}</option>
              <option value={WEAPON_TYPE.SHOTGUN}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.SHOTGUN])}</option>
              <option value={WEAPON_TYPE.MACHINEGUN}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.MACHINEGUN])}</option>
              <option value={WEAPON_TYPE.HAND_CANNON}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.HAND_CANNON])}</option>
              <option value={WEAPON_TYPE.ROCKET_LAUNCHER}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.ROCKET_LAUNCHER])}</option>
              <option value={WEAPON_TYPE.FUSION}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.FUSION])}</option>
              <option value={WEAPON_TYPE.SNIPER}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.SNIPER])}</option>
              <option value={WEAPON_TYPE.PULSE}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.PULSE])}</option>
              <option value={WEAPON_TYPE.SCOUT}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.SCOUT])}</option>
              <option value={WEAPON_TYPE.SIDEARM}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.SIDEARM])}</option>
              <option value={WEAPON_TYPE.SWORD}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.SWORD])}</option>
              <option value={WEAPON_TYPE.LINEAR_FUSION}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.LINEAR_FUSION])}</option>
              <option value={WEAPON_TYPE.GRENADE_LAUNCHER}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.GRENADE_LAUNCHER])}</option>
              <option value={WEAPON_TYPE.SUBMACHINE_GUN}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.SUBMACHINE_GUN])}</option>
              <option value={WEAPON_TYPE.TRACE}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.TRACE])}</option>
              <option value={WEAPON_TYPE.BOW}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.BOW])}</option>
              <option value={WEAPON_TYPE.GLAIVE}>{t(WEAPON_TYPE_NAME[WEAPON_TYPE.GLAIVE])}</option>
            </select>
          </div>
        </div>
        <nav className="flex flex-wrap gap-3">
          <LeftClickLink route={ROUTES.SOUND_ADD} text="Add a Sound" />
          <LeftClickLink route={ROUTES.WEAPONS} text={t('weapons')} />
          <EscapeLink route={ROUTES.TRIALS} text={t('back')} />
        </nav>
      </div>
      <div className="container mx-auto">
        {Object.entries(WEAPON_TYPE)
          .filter((values) => (type === 0 ? true : type === values[1]))
          .map(([key, value]) => (
            <SoundCategory key={key} type={value} query={query} />
          ))}

      </div>
    </div>
  );
}

function SoundCategory({ type, query }) {
  const t = useT();

  const sounds = useSelector((state) => state.sounds
    .filter((s) => s.weapons.some((w) => w.type === type))
    .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name)));

  if (sounds.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-3 p-3">
      <div className="p-1 flex gap-x-2 font-bold text-xl border-b border-white/80">
        <div className="text-white uppercase tracking-wider">
          {t(WEAPON_TYPE_NAME[type])}
        </div>
        <img src={WEAPON_TYPE_IMAGE[type]} alt={t(WEAPON_TYPE_NAME[type])} className="h-7 w-7" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sounds.map((s) => <Sound key={s.id} s={s} />)}
      </div>
    </div>
  );
}

function Sound({ s }) {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);

  const weapons = useSelector((state) => state.weapons);

  const handlePlay = () => {
    if (playing) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="flex flex-col gap-1 p-3 bg-transparent hover:bg-gray-light border border-white/30 hover:border-white/80 transition-colors">
      <div className="flex justify-between gap-2">
        <span className="text-lg tracking-wide text-white">{s.name}</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handlePlay} className="text-white underline">{playing ? 'Pause' : 'Listen'}</button>
          <Link to={generatePath(ROUTES.SOUND_EDIT, { id: s.id })} className="text-white underline">Edit</Link>
        </div>
      </div>
      <span className="text-white/80">{s.description}</span>
      <div className="flex flex-wrap gap-2">
        {weapons.length !== 0 && s.weapons.map((w) => <Weapon key={w.id} w={weapons.find((fw) => fw.id === w.id)} />)}
      </div>
      <audio ref={audioRef} src={`/uploads/sounds/${s.path}`} preload="auto" onEnded={() => setPlaying(false)}>
        <track kind="captions" />
      </audio>
    </div>
  );
}

function Weapon({ w }) {
  const locale = useLocale();
  return (
    <div className="flex items-center gap-1 p-1 border border-white/30">
      <WeaponIcon icon={w.icon} alt={w.names[locale]} iconWatermark={w.iconWatermark} className="w-8 h-8" />
      <span className="tracking-wide text-white">{w.names[locale]}</span>
    </div>
  );
}

SoundCategory.propTypes = {
  type: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
};

Sound.propTypes = {
  s: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    weapons: PropTypes.array.isRequired,
  }).isRequired,
};

Weapon.propTypes = {
  w: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    iconWatermark: PropTypes.string,
    names: PropTypes.object.isRequired,
  }).isRequired,
};
