import React from 'react';
import PropTypes from 'prop-types';
import { useCurrentBounty } from '../../../hooks/bounty';
import { useT } from '../../../hooks/translations';
import { WEAPON_RARITY_IMAGE, WEAPON_RARITY_NAME, WEAPON_RARITY } from '../../../utils/weapons';

export default function TrialsInputRarity() {
  const currentBounty = useCurrentBounty();
  return (
    <section>
      <div className="flex gap-x-1 md:gap-x-2">
        {Object.entries(WEAPON_RARITY).reverse().map(([key, value]) => (
          <RarityButton
            key={key}
            rarity={value}
            found={currentBounty.knowledge.include.rarity.length > 0}
            include={currentBounty.knowledge.include.rarity.includes(value)}
            exclude={currentBounty.knowledge.exclude.rarity.includes(value)}
          />
        ))}
      </div>
    </section>
  );
}

function RarityButton({ rarity, found, include = false, exclude = false }) {
  const t = useT();
  return (
    <div className={`flex gap-x-2 items-center ${found && !include ? 'hidden' : ''}`}>
      <div className={`p-1 border border-white/30 hover:border-white/50 transition-colors duration-300 ${include ? 'bg-blue-light/50' : ''} ${exclude ? 'bg-red/30' : ''} ${!include && !exclude ? 'bg-gray-light/30' : ''}`}>
        <img src={WEAPON_RARITY_IMAGE[rarity]} alt={WEAPON_RARITY_NAME[rarity]} className="w-10 h-10 md:w-12 md:h-12" />
      </div>
      {found && include && (
        <div className="font-bold text-xl text-white/90 tracking-wide">
          {t(WEAPON_RARITY_NAME[rarity])}
        </div>
      )}
    </div>
  );
}

RarityButton.propTypes = {
  rarity: PropTypes.number.isRequired,
  found: PropTypes.bool.isRequired,
  include: PropTypes.bool.isRequired,
  exclude: PropTypes.bool.isRequired,
};
