import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryTitle({ title, counter = null }) {
  return (
    <h2 className="flex justify-between text-xl md:text-2xl tracking-wide border-b-2 border-white/60 text-white/70 uppercase whitespace-nowrap select-none">
      <span>{title}</span>
      {counter && <span>{`// ${counter}`}</span>}
    </h2>
  );
}

CategoryTitle.propTypes = {
  title: PropTypes.string.isRequired,
  counter: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

CategoryTitle.defaultProps = {
  counter: null,
};
