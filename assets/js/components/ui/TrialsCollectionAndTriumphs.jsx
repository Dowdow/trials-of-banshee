import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import collection from '../../../img/misc/collection.jpg';
import triumphs from '../../../img/misc/triumphs.png';

export default function TrialsCollectionAndTriumphs({ onLink }) {
  return (
    <div className="w-full">
      <div>
        <h2 className="text-xl md:text-2xl tracking-wide text-white/70 uppercase select-none">Collection and Triumphs</h2>
        <div className="w-full h-0.5 bg-white/60" />
      </div>
      <div className="flex gap-3 md:gap-10 mt-4 -ml-1">
        <Link to={ROUTES.COLLECTION} onClick={(e) => onLink(e, ROUTES.COLLECTION)} className="p-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
          <div className="bg-white">
            <img src={collection} alt="Collection" className="hover:opacity-70 transition-opacity duration-300" loading="lazy" />
          </div>
        </Link>
        <Link to={ROUTES.TRIUMPHS} onClick={(e) => onLink(e, ROUTES.TRIUMPHS)} className="p-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
          <div className="bg-white">
            <img src={triumphs} alt="Triumphs" className="hover:opacity-70 transition-opacity duration-300" loading="lazy" />
          </div>
        </Link>
      </div>
    </div>
  );
}

TrialsCollectionAndTriumphs.propTypes = {
  onLink: PropTypes.func.isRequired,
};
