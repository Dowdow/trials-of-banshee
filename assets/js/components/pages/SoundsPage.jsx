import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import { setSounds } from '../../actions/sounds';
import { useAdmin } from '../../hooks/user';
import { ROUTES, ROUTES_API } from '../../utils/routes';
import KeyboardButton from '../ui/KeyboardButton';

export default function SoundsPage() {
  const admin = useAdmin();
  const dispatch = useDispatch();

  const sounds = useSelector((state) => state.sounds);

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (admin) {
      fetch(ROUTES_API.SOUNDS)
        .then((res) => res.json())
        .then((data) => dispatch(setSounds(data.items)));
    }
  }, []);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  if (!admin) {
    return null;
  }

  return (
    <div className="bg-dark min-h-screen">
      <div className="sticky top-0 flex justify-between items-center flex-wrap gap-3 md:gap-6 w-full bg-dark-grey p-3 md:p-5">
        <div className="flex items-center flex-wrap gap-3 md:gap-6">
          <div>
            <h1 className="mb-1 md:mb-3 font-neue-haas-display-bold text-5xl md:text-6xl text-white">Sounds</h1>
            <div className="w-full h-0.5 bg-white/50" />
          </div>
          <div className="flex items-center flex-wrap gap-2 md:gap-6">
            <input type="text" value={query} onChange={handleQuery} className="p-2 text-lg bg-light-grey text-white outline-none" placeholder="Search a sound" />
          </div>
        </div>
        <nav className="flex flex-wrap gap-3">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 p-3 md:py-5">
          {sounds
            .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((s) => <Sound key={s.id} s={s} />)}
        </div>
      </div>
    </div>
  );
}

function Sound({ s }) {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);

  const weapons = useSelector((state) => state.weapons);

  const handlePlay = () => {
    if (playing) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="p-1 border-2 border-transparent hover:border-white/80 transition-colors duration-300">
      <div className="flex flex-col gap-1 p-5 bg-transparent hover:bg-light-grey border border-white/30 hover:border-white/80 transition-colors">
        <div className="flex justify-between gap-2">
          <span className="text-lg tracking-wide text-white">{s.name}</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={handlePlay} className="text-white underline">{playing ? 'Pause' : 'Listen'}</button>
            <Link to={generatePath(ROUTES.SOUND_EDIT, { id: s.id })} className="text-white underline">Edit</Link>
          </div>
        </div>
        <span className="text-white/80">{s.description}</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {weapons.length !== 0 && s.weapons.map((w) => <Weapon key={w} w={weapons.find((fw) => fw.id === w)} />)}
        </div>
        <audio ref={audioRef} src={`/uploads/sounds/${s.path}`} preload="auto" onEnded={() => setPlaying(false)}>
          <track kind="captions" />
        </audio>
      </div>
    </div>
  );
}

function Weapon({ w }) {
  return (
    <button type="button" className="flex items-center gap-1 p-1 border border-white/30">
      <img src={`https://bungie.net${w.icon}`} alt={w.names.fr} className="w-8 h-8" loading="lazy" />
      <span className="tracking-wide text-white">{w.names.fr}</span>
    </button>
  );
}

Sound.propTypes = {
  s: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    weapons: PropTypes.array.isRequired,
  }).isRequired,
};

Weapon.propTypes = {
  w: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    names: PropTypes.object.isRequired,
  }).isRequired,
};
