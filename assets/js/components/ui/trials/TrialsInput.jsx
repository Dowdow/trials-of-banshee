import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { postGuess } from '../../../actions/bounties';
import { useCurrentBounty } from '../../../hooks/bounty';
import { useLocale, useT } from '../../../hooks/translations';
import { DEFAULT_LOCALE } from '../../../utils/locale';
import CategoryTitle from '../CategoryTitle';
import WeaponIcon from '../weapon/WeaponIcon';

export default function TrialsInput() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const t = useT();

  const currentBounty = useCurrentBounty();
  const locale = useLocale();
  const weapons = useSelector((state) => state.weapons);

  const [guessInput, setGuessInput] = useState('');

  const handleClickGuess = (weaponId) => {
    setGuessInput('');
    inputRef.current.focus();
    dispatch(postGuess(currentBounty.id, weaponId));
  };

  useEffect(() => {
    if (currentBounty.completed) {
      inputRef.current.blur();
    }
  }, [currentBounty]);

  return (
    <section>
      <CategoryTitle title={t('trials.guess')} />
      <div className="relative mt-4">
        <input
          ref={inputRef}
          type="text"
          value={guessInput}
          disabled={currentBounty.completed}
          onChange={(e) => setGuessInput(e.target.value)}
          className="w-full p-2 text-lg bg-light-grey/30 border border-white/30 hover:border-white/50 focus:border-white/70 text-white transition-colors duration-300 disabled:cursor-not-allowed"
          placeholder={t('trials.input.placeholder')}
          autoComplete="off"
        />
        {guessInput !== '' && (
          <div className="absolute grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-1 w-full max-h-80 p-2 bg-light-grey/95 border-b border-x border-white/70 overflow-y-scroll overflow-x-hidden z-20">
            {weapons
              .filter((w) => !currentBounty.history.includes(w.id))
              .filter((w) => w.names[locale].toLowerCase().includes(guessInput.toLowerCase()) || w.names[DEFAULT_LOCALE].toLowerCase().includes(guessInput.toLowerCase()))
              .map((w) => <WeaponGuess key={w.id} w={w} onClick={handleClickGuess} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function WeaponGuess({ w, onClick }) {
  const locale = useLocale();
  return (
    <button type="button" onClick={() => onClick(w.id)} className="flex items-center gap-2 p-1 border border-transparent hover:border-white transition-colors duration-300">
      <WeaponIcon icon={w.icon} alt={w.names[locale]} iconWatermark={w.iconWatermark} className="w-10 h-10" />
      <span className="text-white/90 text-start">{w.names[locale]}</span>
    </button>
  );
}

WeaponGuess.propTypes = {
  w: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    iconWatermark: PropTypes.string,
    names: PropTypes.object.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
