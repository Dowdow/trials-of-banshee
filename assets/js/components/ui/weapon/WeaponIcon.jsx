import React from 'react';
import PropTypes from 'prop-types';

export default function WeaponIcon({ icon, alt, iconWatermark = null, className = null }) {
  return (
    <div className={`relative border border-white/30 ${className || 'w-24 h-24'}`}>
      {iconWatermark && <img src={`https://bungie.net${iconWatermark}`} alt={alt} className="absolute top-0 left-0" loading="lazy" />}
      <img src={`https://bungie.net${icon}`} alt={alt} loading="lazy" />
    </div>
  );
}

WeaponIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  iconWatermark: PropTypes.string,
  className: PropTypes.string,
};

WeaponIcon.defaultProps = {
  iconWatermark: null,
  className: null,
};
