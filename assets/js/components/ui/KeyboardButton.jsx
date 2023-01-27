import React from 'react';
import PropTypes from 'prop-types';

export default function KeyboardButton({ button }) {
  return (
    <div className="flex justify-center items-center w-6 h-6 bg-black/20 border border-white/70 text-1xl rounded">
      <div className="mt-0.5 text-white">{button}</div>
    </div>
  );
}

KeyboardButton.propTypes = {
  button: PropTypes.string.isRequired,
};
