import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useCurrentBounty } from '../../../hooks/bounty';
import { useLocale, useT } from '../../../hooks/translations';
import CategoryTitle from '../CategoryTitle';
import Tooltipable from '../Tooltipable';
import WeaponIcon from '../weapon/WeaponIcon';

export default function TrialsHistory() {
  const scrollDiv = useRef();
  const t = useT();

  const currentBounty = useCurrentBounty();
  const weapons = useSelector((state) => state.weapons);

  useEffect(() => {
    scrollDiv.current.addEventListener('wheel', (e) => {
      e.preventDefault();
      scrollDiv.current.scrollLeft += e.deltaY;
    });
  }, []);

  return (
    <section>
      <CategoryTitle title={t('trials.history')} />
      {currentBounty.history.length === 0 && (
        <div className="mt-4 text-lg text-white/70">
          {(t('trials.history.empty'))}
        </div>
      )}
      <div ref={scrollDiv} className="mt-4 w-full max-w-full overflow-x-scroll noscrollbar">
        <div className="flex flex-row-reverse justify-end gap-x-2">
          {currentBounty.history.map((weapon, index) => (
            <WeaponHistory
              key={weapon}
              correct={currentBounty.completed ? index === (currentBounty.history.length - 1) : false}
              weapon={weapons.find((w) => w.id === weapon)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WeaponHistory({ weapon, correct = false }) {
  const locale = useLocale();
  const t = useT();

  return (
    <Tooltipable>
      {(onMouseEnter, onMouseLeave) => (
        <div
          className="relative animate-wiggle"
          onMouseEnter={() => onMouseEnter(weapon.names[locale], t('trials.history.weapon'))}
          onMouseLeave={() => onMouseLeave()}
        >
          <WeaponIcon icon={weapon.icon} alt={weapon.names[locale]} iconWatermark={weapon.iconWatermark} className="w-20 h-20" />
          <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
            {correct ? (
              <>
                <div className="absolute -bottom-10 -right-10 bg-blue-light h-20 w-20 shadow-gray-dark rotate-45" />
                <div className="absolute bottom-3.5 right-2.5 h-2.5 w-4 border-l-4 border-b-4 border-white -rotate-45" />
              </>
            ) : (
              <>
                <div className="absolute -bottom-10 -right-10 bg-red/90 h-20 w-20 shadow-gray-dark rotate-45" />
                <div className="absolute bottom-3.5 right-2.5 h-1 w-5 bg-white rotate-45" />
                <div className="absolute bottom-3.5 right-2.5 h-1 w-5 bg-white -rotate-45" />
              </>
            )}
          </div>
        </div>
      )}
    </Tooltipable>
  );
}

WeaponHistory.propTypes = {
  weapon: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    iconWatermark: PropTypes.string,
    names: PropTypes.object.isRequired,
  }).isRequired,
  correct: PropTypes.bool,
};

WeaponHistory.defaultProps = {
  correct: false,
};
