import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSounds } from '../../actions/sounds';
import { ROUTES, ROUTES_API } from '../../utils/routes';
import KeyboardButton from '../ui/KeyboardButton';

export default function SoundsPage() {
  const dispatch = useDispatch();

  const sounds = useSelector((state) => state.sounds);

  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(ROUTES_API.SOUNDS)
      .then((res) => res.json())
      .then((data) => dispatch(setSounds(data.items)));
  }, []);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="bg-dark min-h-screen">
      <div className="sticky top-0 flex justify-between items-center gap-6 w-full bg-dark-grey p-5">
        <div>
          <h1 className="mb-3 font-neue-haas-display-bold text-6xl text-white">Sounds</h1>
          <div className="w-full h-0.5 bg-white/50" />
        </div>
        <div className="flex items-center gap-6">
          <input type="text" value={query} onChange={handleQuery} className="p-2 text-lg bg-light-grey text-white outline-none" placeholder="Search a sound" />
        </div>
        <nav className="flex gap-3">
          <Link to={ROUTES.SOUND_ADD} className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
            <KeyboardButton button="A" />
            <span className="text-xl tracking-wide text-white/80">Add a Sound</span>
          </Link>
          <Link to={ROUTES.WEAPONS} className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
            <KeyboardButton button="W" />
            <span className="text-xl tracking-wide text-white/80">Go to Weapons</span>
          </Link>
          <Link to={ROUTES.TRIALS} className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
            <KeyboardButton button="B" />
            <span className="text-xl tracking-wide text-white/80">Back to the Trials</span>
          </Link>
          <Link to={ROUTES.INDEX} className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
            <KeyboardButton button="O" />
            <span className="text-xl tracking-wide text-white/80">Back to Orbit</span>
          </Link>
        </nav>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-5 py-5 px-3">
          {sounds
            .filter((s) => s.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || s.description.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
            .sort((a, b) => a.names.fr.localeCompare(b.names.fr))
            .map((s) => <Sound key={s.id} s={s} />)}
        </div>
      </div>
    </div>
  );
}

function Sound({ s }) {
  return (
    <div className="p-1 border-2 border-transparent hover:border-white/80 transition-colors duration-300 cursor-pointer">
      <div className="flex gap-5 p-5 bg-transparent hover:bg-light-grey border border-white/30 hover:border-white/80 transition-colors">
        <span className="text-lg tracking-wide text-white">{s.name}</span>
        <span className="text-white/80">{s.description}</span>
      </div>
    </div>
  );
}

Sound.propTypes = {
  s: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};
