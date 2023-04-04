import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { postGuess, setPopupWeapons } from '../../../actions/bounties';
import { useCurrentBounty } from '../../../hooks/bounty';
import { useLocale, useT } from '../../../hooks/translations';
import { WEAPON_TYPE, WEAPON_TYPE_IMAGE, WEAPON_TYPE_NAME } from '../../../utils/weapons';
import TrialsWeaponGuess from './TrialsWeaponGuess';

export default function TrialsPossibleWeaponsPopup() {
  const dispatch = useDispatch();

  const currentBounty = useCurrentBounty();
  const show = useSelector((state) => state.bounties.popup);

  const handleClickGuess = (weaponId) => {
    dispatch(postGuess(currentBounty.id, weaponId));
  };

  const handleClose = () => {
    dispatch(setPopupWeapons(false));
  };

  if (!currentBounty) {
    return null;
  }

  return (
    <div onClick={handleClose} className={`${show ? '' : 'hidden'} absolute top-0 left-0 w-full h-full flex justify-center items-center bg-light-grey/90 backdrop-blur-sm`}>
      <div className="container mx-auto max-h-[75%] bg-dark-grey/90 text-white/90 overflow-y-scroll noscrollbar">
        <div className="flex flex-col gap-y-2 p-1">
          {Object.entries(WEAPON_TYPE)
            .filter((values) => (currentBounty.knowledge.include.weaponType.length > 0 ? currentBounty.knowledge.include.weaponType.includes(values[1]) : !currentBounty.knowledge.exclude.weaponType.includes(values[1])))
            .map(([key, value]) => (
              <WeaponCategory
                key={key}
                weaponType={value}
                knowledge={currentBounty.knowledge}
                onClick={handleClickGuess}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function WeaponCategory({ weaponType, knowledge, onClick }) {
  const locale = useLocale();
  const t = useT();

  const weapons = useSelector((state) => state.weapons
    .filter((w) => w.type === weaponType)
    .filter((w) => (knowledge.include.rarity.length > 0 ? knowledge.include.rarity.includes(w.rarity) : true))
    .filter((w) => (knowledge.include.damageType.length > 0 ? knowledge.include.damageType.includes(w.damageType) : true))
    .filter((w) => !knowledge.exclude.rarity.includes(w.rarity))
    .filter((w) => !knowledge.exclude.damageType.includes(w.damageType))
    .sort((a, b) => {
      if (a.rarity === b.rarity) {
        if (a.damageType === b.damageType) {
          return a.names[locale].localeCompare(b.names[locale]);
        }
        return a.damageType - b.damageType;
      }
      return b.rarity - a.rarity;
    }));

  if (
    (knowledge.include.weaponType.length > 0 && !knowledge.include.weaponType.includes(weaponType))
    || knowledge.exclude.weaponType.includes(weaponType)
    || weapons.length === 0
  ) {
    return null;
  }

  return (
    <div>
      <div className="sticky top-0 p-1 flex gap-x-2 font-bold text-xl border-b border-white/80 bg-dark-grey z-10">
        <div>
          {t(WEAPON_TYPE_NAME[weaponType])}
        </div>
        <img src={WEAPON_TYPE_IMAGE[weaponType]} alt={t(WEAPON_TYPE_NAME[weaponType])} className="h-7 w-7" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1 p-1">
        {weapons.map((w) => <TrialsWeaponGuess key={w.id} w={w} onClick={onClick} />)}
      </div>
    </div>
  );
}

WeaponCategory.propTypes = {
  weaponType: PropTypes.number.isRequired,
  knowledge: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
