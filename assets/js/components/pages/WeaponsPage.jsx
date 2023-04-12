import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setDamageType, setHasSound, setQuery, setRarity, setType } from '../../actions/weaponFilters';
import { useLocale, useT } from '../../hooks/translations';
import { useUserAdmin } from '../../hooks/user';
import { DEFAULT_LOCALE } from '../../utils/locale';
import { WEAPON_DAMAGE_TYPE, WEAPON_DAMAGE_TYPE_IMAGE, WEAPON_DAMAGE_TYPE_NAME, WEAPON_RARITY, WEAPON_RARITY_NAME, WEAPON_TYPE, WEAPON_TYPE_IMAGE, WEAPON_TYPE_NAME } from '../../utils/weapons';
import { ROUTES } from '../../utils/routes';
import EscapeLink from '../ui/clickable/EscapeLink';
import LeftClickLink from '../ui/clickable/LeftClickLink';
import WeaponIcon from '../ui/weapon/WeaponIcon';
import promo from '../../../img/misc/promotion.png';
import releg from '../../../img/misc/relegation.png';

export default function WeaponsPage() {
  const admin = useUserAdmin();
  const dispatch = useDispatch();
  const t = useT();

  const { damageType, hasSound, query, rarity, type } = useSelector((state) => state.weaponFilters);

  const handleDamageType = (e) => {
    dispatch(setDamageType(parseInt(e.target.value, 10)));
  };

  const handleHasSound = (e) => {
    dispatch(setHasSound(parseInt(e.target.value, 10)));
  };

  const handleQuery = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const handleRarity = (e) => {
    dispatch(setRarity(parseInt(e.target.value, 10)));
  };

  const handleType = (e) => {
    dispatch(setType(parseInt(e.target.value, 10)));
  };

  return (
    <div className="bg-dark min-h-screen">
      <div className="sticky top-0 flex justify-between items-center flex-wrap gap-3 md:gap-6 w-full p-3 md:p-5 bg-dark-grey z-10">
        <div className="flex items-center flex-wrap gap-3 md:gap-6">
          <div>
            <h1 className="mb-1 md:mb-3 font-neue-haas-display-bold text-5xl md:text-6xl text-white">{t('weapons')}</h1>
            <div className="w-full h-0.5 bg-white/50" />
          </div>
          <div className="flex items-center flex-wrap gap-2 md:gap-6">
            <input type="text" value={query} onChange={handleQuery} className="p-2 text-lg bg-light-grey text-white" placeholder={t('weapons.filters.search')} />
            <select value={rarity} onChange={handleRarity} className="p-2 text-lg bg-light-grey text-white">
              <option value={0}>{t('weapons.filters.rarity.all')}</option>
              <option value={WEAPON_RARITY.EXOTIC}>{t(WEAPON_RARITY_NAME[WEAPON_RARITY.EXOTIC])}</option>
              <option value={WEAPON_RARITY.LEGENDARY}>{t(WEAPON_RARITY_NAME[WEAPON_RARITY.LEGENDARY])}</option>
              <option value={WEAPON_RARITY.RARE}>{t(WEAPON_RARITY_NAME[WEAPON_RARITY.RARE])}</option>
              <option value={WEAPON_RARITY.COMMON}>{t(WEAPON_RARITY_NAME[WEAPON_RARITY.COMMON])}</option>
              <option value={WEAPON_RARITY.BASIC}>{t(WEAPON_RARITY_NAME[WEAPON_RARITY.BASIC])}</option>
            </select>
            <select value={damageType} onChange={handleDamageType} className="p-2 text-lg bg-light-grey text-white">
              <option value={0}>{t('weapons.filters.damage.all')}</option>
              <option value={WEAPON_DAMAGE_TYPE.KINETIC}>{t(WEAPON_DAMAGE_TYPE_NAME[WEAPON_DAMAGE_TYPE.KINETIC])}</option>
              <option value={WEAPON_DAMAGE_TYPE.ARC}>{t(WEAPON_DAMAGE_TYPE_NAME[WEAPON_DAMAGE_TYPE.ARC])}</option>
              <option value={WEAPON_DAMAGE_TYPE.SOLAR}>{t(WEAPON_DAMAGE_TYPE_NAME[WEAPON_DAMAGE_TYPE.SOLAR])}</option>
              <option value={WEAPON_DAMAGE_TYPE.STASIS}>{t(WEAPON_DAMAGE_TYPE_NAME[WEAPON_DAMAGE_TYPE.STASIS])}</option>
              <option value={WEAPON_DAMAGE_TYPE.STRAND}>{t(WEAPON_DAMAGE_TYPE_NAME[WEAPON_DAMAGE_TYPE.STRAND])}</option>
              <option value={WEAPON_DAMAGE_TYPE.VOID}>{t(WEAPON_DAMAGE_TYPE_NAME[WEAPON_DAMAGE_TYPE.VOID])}</option>
            </select>
            <select value={type} onChange={handleType} className="p-2 text-lg bg-light-grey text-white">
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
            <select value={hasSound} onChange={handleHasSound} className="p-2 text-lg bg-light-grey text-white">
              <option value={0}>{t('weapons.filters.sound.all')}</option>
              <option value={1}>{t('weapons.filters.sound.with')}</option>
              <option value={2}>{t('weapons.filters.sound.without')}</option>
            </select>
          </div>
        </div>
        <nav className="flex flex-wrap gap-3">
          {admin && <LeftClickLink route={ROUTES.SOUNDS} text={t('sounds')} />}
          <EscapeLink route={ROUTES.TRIALS} text={t('back')} />
        </nav>
      </div>
      <div className="container mx-auto">
        {Object.entries(WEAPON_TYPE)
          .filter((values) => (type === 0 ? true : type === values[1]))
          .map(([key, value]) => (
            <WeaponCategory key={key} type={value} query={query} hasSound={hasSound} damageType={damageType} rarity={rarity} />
          ))}
      </div>
    </div>
  );
}

function WeaponCategory({ type, query, hasSound, damageType, rarity }) {
  const locale = useLocale();
  const t = useT();

  const weapons = useSelector((state) => state.weapons
    .filter((w) => w.type === type)
    .filter((w) => w.names[locale].toLocaleLowerCase().includes(query.toLocaleLowerCase()) || w.names[DEFAULT_LOCALE].toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    .filter((w) => {
      if (hasSound === 1) return w.hasSound === true;
      if (hasSound === 2) return w.hasSound === false;
      return true;
    })
    .filter((w) => (damageType === 0 ? true : w.damageType === damageType))
    .filter((w) => (rarity === 0 ? true : w.rarity === rarity))
    .sort((a, b) => {
      if (a.rarity === b.rarity) {
        if (a.damageType === b.damageType) {
          return a.names[locale].localeCompare(b.names[locale]);
        }
        return a.damageType - b.damageType;
      }
      return b.rarity - a.rarity;
    }));

  return (
    <div className="flex flex-col gap-y-3 p-3">
      <div className="p-1 flex gap-x-2 font-bold text-xl border-b border-white/80">
        <div className="text-white uppercase tracking-wider">
          {t(WEAPON_TYPE_NAME[type])}
        </div>
        <img src={WEAPON_TYPE_IMAGE[type]} alt={t(WEAPON_TYPE_NAME[type])} className="h-7 w-7" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {weapons.map((w) => <Weapon key={w.id} w={w} />)}
      </div>
    </div>
  );
}

function Weapon({ w }) {
  const locale = useLocale();
  const t = useT();
  return (
    <a
      href={`https://www.light.gg/db/items/${w.hash}`}
      target="_blank"
      rel="noreferrer"
      className="flex gap-3 p-3 bg-transparent hover:bg-light-grey border border-white/30 hover:border-white/80 transition-colors duration-300 cursor-pointer"
    >
      <WeaponIcon
        icon={w.icon}
        alt={w.names[locale]}
        iconWatermark={w.iconWatermark}
        className="w-20 h-20 min-w-[5rem] min-h-[5rem]"
      />
      <div className="flex flex-col overflow-hidden">
        <span className="text-lg tracking-wide text-white">{w.names[locale]}</span>
        <span className="text-white/60">{t(WEAPON_TYPE_NAME[w.type])}</span>
        <div className="flex items-center gap-2 mt-1">
          <img src={WEAPON_DAMAGE_TYPE_IMAGE[w.damageType]} alt={t(WEAPON_DAMAGE_TYPE_NAME[w.damageType])} className="w-5 h-5" loading="lazy" />
          <img src={w.hasSound ? promo : releg} alt={w.hasSound ? 'Promotion' : 'Relegation'} className="w-5 h-5" loading="lazy" />
        </div>
      </div>
    </a>
  );
}

WeaponCategory.propTypes = {
  type: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  hasSound: PropTypes.number.isRequired,
  damageType: PropTypes.number.isRequired,
  rarity: PropTypes.number.isRequired,
};

Weapon.propTypes = {
  w: PropTypes.shape({
    id: PropTypes.number.isRequired,
    damageType: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired,
    hasSound: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    iconWatermark: PropTypes.string,
    names: PropTypes.shape({
      fr: PropTypes.string.isRequired,
    }),
    type: PropTypes.number.isRequired,
  }).isRequired,
};
