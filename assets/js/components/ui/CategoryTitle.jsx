import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryTitle({ title }) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl tracking-wide text-white/70 uppercase whitespace-nowrap select-none">{title}</h2>
      <div className="w-full h-0.5 bg-white/60" />
    </div>
  );
}

CategoryTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
