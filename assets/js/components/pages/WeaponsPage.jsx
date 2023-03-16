import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setDamageType, setHasSound, setQuery, setRarity, setType } from '../../actions/weaponFilters';
import { useAdmin } from '../../hooks/user';
import { WEAPON_DAMAGE_TYPE, WEAPON_DAMAGE_TYPE_IMAGE, WEAPON_DAMAGE_TYPE_NAME, WEAPON_RARITY, WEAPON_TYPE, WEAPON_TYPE_NAME } from '../../utils/weapons';
import { ROUTES } from '../../utils/routes';
import KeyboardButton from '../ui/KeyboardButton';
import promo from '../../../img/misc/promotion.png';
import releg from '../../../img/misc/relegation.png';

export default function WeaponsPage() {
  const admin = useAdmin();
  const dispatch = useDispatch();

  const weapons = useSelector((state) => state.weapons);
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
      <div className="sticky top-0 flex justify-between items-center flex-wrap gap-3 md:gap-6 w-full p-3 md:p-5 bg-dark-grey">
        <div className="flex items-center flex-wrap gap-3 md:gap-6">
          <div>
            <h1 className="mb-1 md:mb-3 font-neue-haas-display-bold text-5xl md:text-6xl text-white">Weapons</h1>
            <div className="w-full h-0.5 bg-white/50" />
          </div>
          <div className="flex items-center flex-wrap gap-2 md:gap-6">
            <input type="text" value={query} onChange={handleQuery} className="p-2 text-lg bg-light-grey text-white" placeholder="Search a weapon" />
            <select value={rarity} onChange={handleRarity} className="p-2 text-lg bg-light-grey text-white">
              <option value={0}>All Rarity</option>
              <option value={WEAPON_RARITY.EXOTIC}>Exotic</option>
              <option value={WEAPON_RARITY.LEGENDARY}>Legendary</option>
              <option value={WEAPON_RARITY.RARE}>Rare</option>
              <option value={WEAPON_RARITY.COMMON}>Common</option>
              <option value={WEAPON_RARITY.BASIC}>Basic</option>
            </select>
            <select value={damageType} onChange={handleDamageType} className="p-2 text-lg bg-light-grey text-white">
              <option value={0}>All Damage Type</option>
              <option value={WEAPON_DAMAGE_TYPE.KINETIC}>Kinetic</option>
              <option value={WEAPON_DAMAGE_TYPE.ARC}>Arc</option>
              <option value={WEAPON_DAMAGE_TYPE.SOLAR}>Solar</option>
              <option value={WEAPON_DAMAGE_TYPE.STASIS}>Stasis</option>
              <option value={WEAPON_DAMAGE_TYPE.STRAND}>Strand</option>
              <option value={WEAPON_DAMAGE_TYPE.VOID}>Void</option>
            </select>
            <select value={type} onChange={handleType} className="p-2 text-lg bg-light-grey text-white">
              <option value={0}>All Weapon Type</option>
              <option value={WEAPON_TYPE.AUTO}>Auto</option>
              <option value={WEAPON_TYPE.SHOTGUN}>Shotgun</option>
              <option value={WEAPON_TYPE.MACHINEGUN}>Machine Gun</option>
              <option value={WEAPON_TYPE.HAND_CANNON}>Hand Cannon</option>
              <option value={WEAPON_TYPE.ROCKET_LAUNCHER}>Rocket Launcher</option>
              <option value={WEAPON_TYPE.FUSION}>Fusion</option>
              <option value={WEAPON_TYPE.SNIPER}>Sniper</option>
              <option value={WEAPON_TYPE.PULSE}>Pulse</option>
              <option value={WEAPON_TYPE.SCOUT}>Scout</option>
              <option value={WEAPON_TYPE.SIDEARM}>Sidearm</option>
              <option value={WEAPON_TYPE.SWORD}>Sword</option>
              <option value={WEAPON_TYPE.LINEAR_FUSION}>Linear Fusion</option>
              <option value={WEAPON_TYPE.GRENADE_LAUNCHER}>Grenade Launcher</option>
              <option value={WEAPON_TYPE.SUBMACHINE_GUN}>Submachine Gun</option>
              <option value={WEAPON_TYPE.TRACE}>Trace</option>
              <option value={WEAPON_TYPE.BOW}>Bow</option>
              <option value={WEAPON_TYPE.GLAIVE}>Glaive</option>
            </select>
            <select value={hasSound} onChange={handleHasSound} className="p-2 text-lg bg-light-grey text-white">
              <option value={0}>All</option>
              <option value={1}>With Sound</option>
              <option value={2}>Without Sound</option>
            </select>
          </div>
        </div>
        <nav className="flex flex-wrap gap-3">
          {admin && (
            <Link to={ROUTES.SOUNDS} className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
              <KeyboardButton button="S" />
              <span className="text-xl tracking-wide text-white/80">Go to Sounds</span>
            </Link>
          )}
          <Link to={ROUTES.TRIALS} className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
            <KeyboardButton button="B" />
            <span className="text-xl tracking-wide text-white/80">Back to the Trials</span>
          </Link>
          <Link to={ROUTES.INDEX} className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
            <KeyboardButton button="O" />
            <span className="text-xl tracking-wide text-white/80">Back to Orbit</span>
          </Link>
        </nav>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 p-3 md:py-5">
          {weapons
            .filter((w) => w.names.fr.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
            .filter((w) => {
              if (hasSound === 1) return w.hasSound === true;
              if (hasSound === 2) return w.hasSound === false;
              return true;
            })
            .filter((w) => (type === 0 ? true : w.type === type))
            .filter((w) => (damageType === 0 ? true : w.damageType === damageType))
            .filter((w) => (rarity === 0 ? true : w.rarity === rarity))
            .sort((a, b) => a.names.fr.localeCompare(b.names.fr))
            .map((w) => <Weapon key={w.id} w={w} />)}
        </div>
      </div>
    </div>
  );
}

function Weapon({ w }) {
  return (
    <a href={`https://www.light.gg/db/items/${w.hash}`} target="_blank" rel="noreferrer" className="p-1 border-2 border-transparent hover:border-white/80 transition-colors duration-300 cursor-pointer">
      <div className="flex gap-5 p-5 bg-transparent hover:bg-light-grey border border-white/30 hover:border-white/80 transition-colors">
        <img src={`https://bungie.net${w.icon}`} alt={w.names.fr} className="w-20 h-20 border border-white/30" loading="lazy" />
        <div className="flex flex-col overflow-hidden">
          <span className="text-lg tracking-wide text-white whitespace-nowrap text-ellipsis">{w.names.fr}</span>
          <span className="text-white/60">{WEAPON_TYPE_NAME[w.type]}</span>
          <div className="flex items-center gap-2 mt-1">
            <img src={WEAPON_DAMAGE_TYPE_IMAGE[w.damageType]} alt={WEAPON_DAMAGE_TYPE_NAME[w.damageType]} className="w-5 h-5" loading="lazy" />
            <img src={w.hasSound ? promo : releg} alt={w.hasSound ? 'This weapon have a sound' : 'This weapon does not have a sound'} className="w-5 h-5" loading="lazy" />
          </div>
        </div>
      </div>
    </a>
  );
}

Weapon.propTypes = {
  w: PropTypes.shape({
    id: PropTypes.number.isRequired,
    damageType: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired,
    hasSound: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    names: PropTypes.shape({
      fr: PropTypes.string.isRequired,
    }),
    type: PropTypes.number.isRequired,
  }).isRequired,
};
