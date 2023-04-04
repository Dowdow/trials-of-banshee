import React from 'react';
import PropTypes from 'prop-types';
import { useCurrentBounty } from '../../../hooks/bounty';
import { WEAPON_DAMAGE_TYPE_IMAGE, WEAPON_DAMAGE_TYPE_NAME, WEAPON_DAMAGE_TYPE } from '../../../utils/weapons';
import { useT } from '../../../hooks/translations';

export default function TrialsInputDamageType() {
  const currentBounty = useCurrentBounty();
  return (
    <section>
      <div className="flex gap-x-1 md:gap-x-2">
        {Object.entries(WEAPON_DAMAGE_TYPE).map(([key, value]) => (
          <DamageTypeButton
            key={key}
            damageType={value}
            found={currentBounty.knowledge.include.damageType.length > 0}
            include={currentBounty.knowledge.include.damageType.includes(value)}
            exclude={currentBounty.knowledge.exclude.damageType.includes(value)}
          />
        ))}
      </div>
    </section>
  );
}

function DamageTypeButton({ damageType, found, include = false, exclude = false }) {
  const t = useT();
  return (
    <div className={`flex gap-x-2 items-center ${found && !include ? 'hidden' : ''}`}>
      <div className={`p-2 border border-white/30 hover:border-white/50 transition-colors duration-300 ${include ? 'bg-light-blue/50' : ''} ${exclude ? 'bg-red/30' : ''} ${!include && !exclude ? 'bg-light-grey/30' : ''}`}>
        <img src={WEAPON_DAMAGE_TYPE_IMAGE[damageType]} alt={WEAPON_DAMAGE_TYPE_NAME[damageType]} className="w-8 h-8 md:w-10 md:h-10" />
      </div>
      {found && include && (
        <div className="font-bold text-xl text-white/90 tracking-wide">
          {t(WEAPON_DAMAGE_TYPE_NAME[damageType])}
        </div>
      )}
    </div>
  );
}

DamageTypeButton.propTypes = {
  damageType: PropTypes.number.isRequired,
  found: PropTypes.bool.isRequired,
  include: PropTypes.bool.isRequired,
  exclude: PropTypes.bool.isRequired,
};
