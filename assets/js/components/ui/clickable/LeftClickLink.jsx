import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LeftClick from './LeftClick';

export default function LeftClickLink({ route, text, onClick = null }) {
  return (
    <Link to={route} onClick={onClick} className="flex items-center gap-1 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
      <LeftClick />
      <span className="text-xl md:text-2xl tracking-wide text-white/80">{text}</span>
    </Link>
  );
}

LeftClickLink.propTypes = {
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

LeftClickLink.defaultProps = {
  onClick: null,
};
