import React from 'react';
import PropTypes from 'prop-types';

export default function OrbitModifierLink({ href, img, text }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/70 backdrop-blur-sm rounded-full">
      <img src={img} alt={text} className="w-9 h-9 opacity-90" />
    </a>
  );
}

OrbitModifierLink.propTypes = {
  href: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
