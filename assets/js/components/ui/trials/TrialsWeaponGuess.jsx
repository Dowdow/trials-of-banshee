import React from 'react';
import PropTypes from 'prop-types';
import { useLocale } from '../../../hooks/translations';
import WeaponIcon from '../weapon/WeaponIcon';

export default function TrialsWeaponGuess({ w, onClick }) {
  const locale = useLocale();
  return (
    <button type="button" onClick={() => onClick(w.id)} className="flex items-center gap-2 p-1 border border-transparent hover:border-white transition-colors duration-300">
      <WeaponIcon
        icon={w.icon}
        alt={w.names[locale]}
        iconWatermark={w.iconWatermark}
        damageType={w.damageType}
        className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem]"
      />
      <span className="text-sm md:text-base text-white/90 text-start">
        {w.names[locale]}
      </span>
    </button>
  );
}

TrialsWeaponGuess.propTypes = {
  w: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    iconWatermark: PropTypes.string,
    names: PropTypes.object.isRequired,
    damageType: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
