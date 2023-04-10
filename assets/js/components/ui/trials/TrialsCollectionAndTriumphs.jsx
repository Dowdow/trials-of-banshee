import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useT } from '../../../hooks/translations';
import { useUserAuthenticated } from '../../../hooks/user';
import { ROUTES } from '../../../utils/routes';
import CategoryTitle from '../CategoryTitle';
import Tooltipable from '../Tooltipable';
import collection from '../../../../img/misc/collection.jpg';
import triumphs from '../../../../img/misc/triumphs.png';

export default function TrialsCollectionAndTriumphs({ onLink }) {
  const authenticated = useUserAuthenticated();
  const t = useT();

  return (
    <section>
      <CategoryTitle title={t('trials.collection.triumphs')} />
      <div className="flex gap-3 md:gap-10 mt-4 -ml-1">
        <Tooltipable>
          {(onMouseEnter, onMouseLeave) => (
            <Link
              to={ROUTES.COLLECTION}
              onClick={(e) => onLink(e, ROUTES.COLLECTION)}
              className="p-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300"
              onMouseEnter={() => onMouseEnter(t('collection'), t('collection.description'), !authenticated)}
              onMouseLeave={() => onMouseLeave()}
            >
              <div className="bg-white">
                <img src={collection} alt={t('collection')} className="hover:opacity-70 transition-opacity duration-300" loading="lazy" />
              </div>
            </Link>
          )}
        </Tooltipable>
        <Tooltipable>
          {(onMouseEnter, onMouseLeave) => (
            <Link
              to={ROUTES.TRIUMPHS}
              onClick={(e) => onLink(e, ROUTES.TRIUMPHS)}
              className="p-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300"
              onMouseEnter={() => onMouseEnter(t('triumphs'), t('triumphs.description'), !authenticated)}
              onMouseLeave={() => onMouseLeave()}
            >
              <div className="bg-white">
                <img src={triumphs} alt={t('triumphs')} className="hover:opacity-70 transition-opacity duration-300" loading="lazy" />
              </div>
            </Link>
          )}
        </Tooltipable>
      </div>
    </section>
  );
}

TrialsCollectionAndTriumphs.propTypes = {
  onLink: PropTypes.func.isRequired,
};
