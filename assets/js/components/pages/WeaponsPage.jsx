import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import KeyboardButton from '../ui/KeyboardButton';

export default function WeaponsPage() {
  const [weapons, setWeapons] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/weapons')
      .then((res) => res.json())
      .then((data) => setWeapons(data.weapons));
  }, []);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="bg-dark min-h-screen">
      <div className="sticky top-0 flex justify-between items-center gap-6 w-full bg-dark-grey p-5">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="mb-3 font-neue-haas-display-bold text-6xl text-white">Weapons</h1>
            <div className="w-full h-0.5 bg-white/50" />
          </div>
          <input type="text" value={query} onChange={handleQuery} className="p-2 text-lg bg-light-grey text-white outline-none" placeholder="Search a weapon" />
        </div>
        <div className="flex gap-3">
          <Link to="/trials" className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70">
            <KeyboardButton button="B" />
            <span className="text-xl tracking-wide text-white/80">Back to the Trials</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70">
            <KeyboardButton button="O" />
            <span className="text-xl tracking-wide text-white/80">Back to Orbit</span>
          </Link>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-5 pt-5 px-3">
          {weapons
            .filter((w) => w.names.fr.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
            .sort((a, b) => a.names.fr.localeCompare(b.names.fr))
            .map((w) => <Weapon key={w.id} w={w} />)}
        </div>
      </div>
    </div>
  );
}

function Weapon({ w }) {
  return (
    <div key={w.id} className="p-1 border-2 border-transparent hover:border-white/80 transition-colors duration-300">
      <div className="flex gap-5 p-5 bg-transparent hover:bg-light-grey border border-white/30 hover:border-white/80 transition-colors cursor-pointer">
        <img src={`https://bungie.net${w.icon}`} alt={w.names.fr} loading="lazy" className="w-20 h-20 border border-white/30" />
        <span className="text-lg tracking-wide text-white">{w.names.fr}</span>
      </div>
    </div>
  );
}

Weapon.propTypes = {
  w: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    names: PropTypes.shape({
      fr: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
