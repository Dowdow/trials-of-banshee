import React from 'react';
import PropTypes from 'prop-types';
import { useCurrentBounty } from '../../../hooks/bounty';
import { useT } from '../../../hooks/translations';
import { WEAPON_TYPE_IMAGE, WEAPON_TYPE_NAME, WEAPON_TYPE } from '../../../utils/weapons';

export default function TrialsInputWeaponType() {
  const currentBounty = useCurrentBounty();
  return (
    <section>
      <div className="flex gap-1 md:gap-2 flex-wrap">
        {Object.entries(WEAPON_TYPE).map(([key, value]) => (
          <WeaponTypeButton
            key={key}
            weaponType={value}
            found={currentBounty.knowledge.include.weaponType.length > 0}
            include={currentBounty.knowledge.include.weaponType.includes(value)}
            exclude={currentBounty.knowledge.exclude.weaponType.includes(value)}
          />
        ))}
      </div>
    </section>
  );
}

function WeaponTypeButton({ weaponType, found, include = false, exclude = false }) {
  const t = useT();
  return (
    <div className={`flex gap-x-2 items-center ${found && !include ? 'hidden' : ''}`}>
      <div className={`p-1 border border-white/30 hover:border-white/50 transition-colors duration-300 ${include ? 'bg-light-blue/50' : ''} ${exclude ? 'bg-red/30' : ''} ${!include && !exclude ? 'bg-light-grey/30' : ''}`}>
        <img src={WEAPON_TYPE_IMAGE[weaponType]} alt={WEAPON_TYPE_NAME[weaponType]} className={`${found ? 'w-10 h-10' : 'w-8 h-8'} md:w-12 md:h-12`} />
      </div>
      {found && include && (
        <div className="font-bold text-xl text-white/90 tracking-wide">
          {t(WEAPON_TYPE_NAME[weaponType])}
        </div>
      )}
    </div>
  );
}

WeaponTypeButton.propTypes = {
  weaponType: PropTypes.number.isRequired,
  found: PropTypes.bool.isRequired,
  include: PropTypes.bool.isRequired,
  exclude: PropTypes.bool.isRequired,
};
