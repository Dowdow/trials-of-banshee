import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useCurrentBounty } from '../../../hooks/bounty';
import CategoryTitle from '../CategoryTitle';
import WeaponIcon from '../weapon/WeaponIcon';

export default function TrialsHistory() {
  const currentBounty = useCurrentBounty();
  const weapons = useSelector((state) => state.weapons);

  return (
    <section>
      <CategoryTitle title="History" />
      {currentBounty.history.length === 0 && (<div className="mt-4 text-lg text-white/70">No history</div>)}
      <div className="flex flex-row-reverse justify-end flex-wrap gap-1 mt-4 -ml-1">
        {currentBounty.history.map((w) => <WeaponHistory key={w} w={weapons.find((fw) => fw.id === w)} />)}
      </div>
    </section>
  );
}

function WeaponHistory({ w }) {
  return (
    <div className="p-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
      <WeaponIcon icon={w.icon} alt={w.names.fr} iconWatermark={w.iconWatermark} className="w-20 h-20" />
    </div>
  );
}

WeaponHistory.propTypes = {
  w: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    iconWatermark: PropTypes.string,
    names: PropTypes.object.isRequired,
  }).isRequired,
};
