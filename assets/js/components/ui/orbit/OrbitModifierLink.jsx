import React from 'react';
import PropTypes from 'prop-types';
import Tooltipable from '../Tooltipable';

export default function OrbitModifierLink({ href, img, text, description }) {
  return (
    <Tooltipable title={text} description={description}>
      {(ref) => (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white/70 backdrop-blur-sm rounded-full opacity-90"
        >
          <img src={img} alt={text} className="w-9 h-9 opacity-90" />
        </a>
      )}
    </Tooltipable>
  );
}

OrbitModifierLink.propTypes = {
  href: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
