import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { useCurrentBounty } from '../../hooks/bounty';
import { ROUTES_API } from '../../utils/routes';
import clue from '../../../img/bounty/clue.jpg';

export default function TrialsInputs() {
  const dispatch = useDispatch();

  const currentBounty = useCurrentBounty();
  const weapons = useSelector((state) => state.weapons);

  const [guess, setGuess] = useState('');

  const handleClickGuess = (weaponId) => {
    fetch(generatePath(ROUTES_API.BOUNTY_GUESS, { id: currentBounty.id }), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weaponId }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleClickClue = () => {
    console.log(currentBounty.id);
  };

  return (
    <div className="w-full pt-10 pl-10">
      <div>
        <h2 className="text-2xl tracking-wide text-white/70 uppercase select-none">Guess</h2>
        <div className="w-full h-0.5 bg-white/60" />
        <div className="relative mt-4">
          <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)} className="w-full p-2 text-lg bg-light-grey/30 border border-white/30 hover:border-white/50 focus:border-white/70 text-white transition-colors duration-300 outline-none" placeholder="Type a weapon name" autoComplete="off" />
          {guess !== '' && (
            <div className="absolute grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-1 w-full max-h-80 p-2 bg-light-grey/95 border-b border-x border-white/70 overflow-y-scroll overflow-x-hidden z-50">
              {weapons
                .filter((w) => w.hasSound)
                .filter((w) => !currentBounty.history.includes(w.id))
                .filter((w) => w.names.fr.toLowerCase().includes(guess.toLowerCase()))
                .map((w) => <WeaponGuess key={w.id} w={w} onClick={handleClickGuess} />)}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl tracking-wide text-white/70 uppercase select-none">Clues</h2>
        <div className="w-full h-0.5 bg-white/60" />
        <div className="flex gap-1 mt-4 -ml-1">
          {Object.entries(currentBounty.clues).map(([key, c]) => (
            <button key={key} type="button" onClick={handleClickClue} className="p-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
              <div className="bg-white">
                <img src={clue} alt="Clue" className="hover:opacity-70 transition-opacity duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl tracking-wide text-white/70 uppercase select-none">History</h2>
        <div className="w-full h-0.5 bg-white/60" />
        <div className="flex gap-1 mt-4">
          {currentBounty.history.map((w) => <WeaponHistory key={w} w={weapons.find((fw) => fw.id === w)} />)}
          {currentBounty.history.length === 0 && (<div className="text-lg text-white/70">No history</div>)}
        </div>
      </div>
    </div>
  );
}

function WeaponGuess({ w, onClick }) {
  return (
    <button type="button" onClick={() => onClick(w.id)} className="flex items-center gap-2 p-1 border border-transparent hover:border-white transition-colors duration-300">
      <img src={`https://bungie.net${w.icon}`} alt={w.names.fr} loading="lazy" className="w-10 h-10 border border-white/30" />
      <span className="text-white/90 text-start">{w.names.fr}</span>
    </button>
  );
}

function WeaponHistory({ w }) {
  return (
    <div className="p-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
      <img src={`https://bungie.net${w.icon}`} alt={w.names.fr} loading="lazy" className="w-20 h-20 border border-white/30" />
    </div>
  );
}

WeaponGuess.propTypes = {
  w: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    names: PropTypes.object.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

WeaponHistory.propTypes = {
  w: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    names: PropTypes.object.isRequired,
  }).isRequired,
};
