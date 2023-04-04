import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postGuess, setPopupWeapons } from '../../../actions/bounties';
import { useCurrentBounty, usePossibleWeapons } from '../../../hooks/bounty';
import { useLocale, useT } from '../../../hooks/translations';
import { DEFAULT_LOCALE } from '../../../utils/locale';
import CategoryTitle from '../CategoryTitle';
import TrialsWeaponGuess from './TrialsWeaponGuess';

export default function TrialsInput() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const t = useT();

  const currentBounty = useCurrentBounty();
  const locale = useLocale();
  const possibleWeapons = usePossibleWeapons();

  const [guessInput, setGuessInput] = useState('');

  const handleClickWeaponsPopup = () => {
    setGuessInput('');
    inputRef.current.blur();
    dispatch(setPopupWeapons(true));
  };

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
        <div className="flex gap-x-1 md:gap-x-2 lg:gap-x-4">
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
          <button
            type="button"
            className="flex gap-x-2 items-center p-2 bg-light-grey/30 border border-white/30 hover:border-white/50 text-lg text-white/70 hover:text-white transition-colors duration-300 whitespace-nowrap"
            onClick={handleClickWeaponsPopup}
          >
            <span>{t('weapons')}</span>
            <span className="font-bold">{possibleWeapons.length}</span>
          </button>
        </div>
        {guessInput !== '' && guessInput.length > 1 && (
          <div className="absolute grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-1 w-full max-h-80 p-2 bg-light-grey/95 border-b border-x border-white/70 overflow-y-scroll overflow-x-hidden z-20">
            {possibleWeapons
              .filter((w) => w.names[locale].toLowerCase().includes(guessInput.toLowerCase()) || w.names[DEFAULT_LOCALE].toLowerCase().includes(guessInput.toLowerCase()))
              .map((w) => <TrialsWeaponGuess key={w.id} w={w} onClick={handleClickGuess} />)}
          </div>
        )}
      </div>
    </section>
  );
}
