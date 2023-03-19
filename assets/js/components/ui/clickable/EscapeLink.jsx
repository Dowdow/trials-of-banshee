import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import EscapeKey from './EscapeKey';
import { useEscapeKey } from '../../../hooks/keyboard';

export default function EscapeLink({ route, text, onClick = null }) {
  const navigate = useNavigate();
  useEscapeKey(onClick || (() => navigate(route)));
  return (
    <Link to={route} onClick={onClick} className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
      <EscapeKey />
      <span className="text-xl md:text-2xl tracking-wide text-white/80">{text}</span>
    </Link>
  );
}

EscapeLink.propTypes = {
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

EscapeLink.defaultProps = {
  onClick: null,
};
