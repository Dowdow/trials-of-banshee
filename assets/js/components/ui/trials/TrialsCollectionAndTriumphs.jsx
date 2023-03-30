import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useT } from '../../../hooks/translations';
import { ROUTES } from '../../../utils/routes';
import CategoryTitle from '../CategoryTitle';
import collection from '../../../../img/misc/collection.jpg';
import triumphs from '../../../../img/misc/triumphs.png';
import { resetTooltip, setTooltip } from '../../../actions/tooltip';

export default function TrialsCollectionAndTriumphs({ onLink }) {
  const dispatch = useDispatch();
  const t = useT();

  const handleMouseEnterCollection = () => {
    dispatch(setTooltip(t('collection'), t('collection.description')));
  };

  const handleMouseLeaveCollection = () => {
    dispatch(resetTooltip());
  };

  const handleMouseEnterTriumphs = () => {
    dispatch(setTooltip(t('triumphs'), t('triumphs.description')));
  };

  const handleMouseLeaveTriumphs = () => {
    dispatch(resetTooltip());
  };

  return (
    <section>
      <CategoryTitle title={t('trials.collection.triumphs')} />
      <div className="flex gap-3 md:gap-10 mt-4 -ml-1">
        <Link
          to={ROUTES.COLLECTION}
          onClick={(e) => onLink(e, ROUTES.COLLECTION)}
          className="p-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300"
          onMouseEnter={handleMouseEnterCollection}
          onMouseLeave={handleMouseLeaveCollection}
        >
          <div className="bg-white">
            <img src={collection} alt={t('collection')} className="hover:opacity-70 transition-opacity duration-300" loading="lazy" />
          </div>
        </Link>
        <Link
          to={ROUTES.TRIUMPHS}
          onClick={(e) => onLink(e, ROUTES.TRIUMPHS)}
          className="p-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300"
          onMouseEnter={handleMouseEnterTriumphs}
          onMouseLeave={handleMouseLeaveTriumphs}
        >
          <div className="bg-white">
            <img src={triumphs} alt={t('triumphs')} className="hover:opacity-70 transition-opacity duration-300" loading="lazy" />
          </div>
        </Link>
      </div>
    </section>
  );
}

TrialsCollectionAndTriumphs.propTypes = {
  onLink: PropTypes.func.isRequired,
};
