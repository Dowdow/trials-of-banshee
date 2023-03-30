import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { resetTooltip, setTooltip } from '../../../actions/tooltip';

export default function OrbitModifierLink({ href, img, text, description }) {
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    dispatch(setTooltip(text, description));
  };

  const handleMouseLeave = () => {
    dispatch(resetTooltip());
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-white/70 backdrop-blur-sm rounded-full opacity-90"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={img} alt={text} className="w-9 h-9 opacity-90" />
    </a>
  );
}

OrbitModifierLink.propTypes = {
  href: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
