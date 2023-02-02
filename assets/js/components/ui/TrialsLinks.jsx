import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import KeyboardButton from './KeyboardButton';

export default function TrialsLinks({ onLink }) {
  return (
    <div className="flex justify-end items-center gap-3 pt-3">
      <Link to={ROUTES.WEAPONS} onClick={(e) => onLink(e, ROUTES.WEAPONS)} className="flex items-center gap-2 px-1 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
        <KeyboardButton button="W" />
        <span className="text-2xl tracking-wide text-white/80">Weapons stock</span>
      </Link>
      <Link to={ROUTES.INDEX} onClick={(e) => onLink(e, ROUTES.INDEX)} className="flex items-center gap-2 px-1 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
        <KeyboardButton button="O" />
        <span className="text-2xl tracking-wide text-white/80">Back to Orbit</span>
      </Link>
    </div>
  );
}

TrialsLinks.propTypes = {
  onLink: PropTypes.func.isRequired,
};
