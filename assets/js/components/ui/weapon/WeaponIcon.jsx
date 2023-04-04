import React from 'react';
import PropTypes from 'prop-types';
import { useT } from '../../../hooks/translations';
import { WEAPON_DAMAGE_TYPE_IMAGE, WEAPON_DAMAGE_TYPE_NAME } from '../../../utils/weapons';

export default function WeaponIcon({ icon, alt, iconWatermark = null, damageType = null, className = null }) {
  const t = useT();
  return (
    <div className={`relative border border-white/30 ${className || 'w-24 h-24 min-w-[6rem] min-h-[6rem]:'}`}>
      {iconWatermark && (
        <img
          src={`https://bungie.net${iconWatermark}`}
          alt={alt}
          className="absolute top-0 left-0"
          loading="lazy"
        />
      )}
      {damageType && (
        <img
          src={WEAPON_DAMAGE_TYPE_IMAGE[damageType]}
          alt={t(WEAPON_DAMAGE_TYPE_NAME[damageType])}
          className="absolute bottom-0 right-0 p-0.5 w-5 h-5 bg-light-grey/30"
          loading="lazy"
        />
      )}
      <img src={`https://bungie.net${icon}`} alt={alt} loading="lazy" />
    </div>
  );
}

WeaponIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  iconWatermark: PropTypes.string,
  damageType: PropTypes.number,
  className: PropTypes.string,
};

WeaponIcon.defaultProps = {
  iconWatermark: null,
  damageType: null,
  className: null,
};
