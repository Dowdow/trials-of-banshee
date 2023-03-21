import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import WeaponIcon from './weapon/WeaponIcon';

export default function SoundForm({ onSubmit, sound = null, error = null }) {
  const allWeapons = useSelector((state) => state.weapons);

  const [name, setName] = useState(sound !== null ? sound.name : '');
  const [description, setDescription] = useState(sound !== null ? sound.description : '');
  const [file, setFile] = useState(null);
  const [weapons, setWeapons] = useState(sound !== null ? sound.weapons : []);
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('name', name);
    payload.append('description', description);
    weapons.forEach((w) => payload.append('weapons[]', w));
    if (file !== null) {
      payload.append('file', file, file.name);
    }

    onSubmit(payload);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleAddWeapon = (id) => {
    setWeapons([...weapons, id]);
    setQuery('');
  };

  const handleRemoveWeapon = (id) => {
    setWeapons([...weapons.filter((w) => w !== id)]);
  };

  return (
    <>
      {error && <div className="mx-6 mt-6 p-3 text-red border-2 border-red">{error.message}</div>}
      <form onSubmit={handleSubmit} className="w-full p-6 text-white/70">
        <div className="flex flex-col mb-3">
          <label className="text-lg font-bold border-b-2 border-white/30 mb-2">Name</label>
          <input type="text" value={name} onChange={handleChangeName} className="p-2 text-lg bg-light-grey text-white" placeholder="Sound name" />
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-lg font-bold border-b-2 border-white/30 mb-2">Description</label>
          <textarea value={description} onChange={handleChangeDescription} className="p-2 text-lg bg-light-grey text-white" placeholder="Sound description" />
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-lg font-bold border-b-2 border-white/30 mb-2">Audio file</label>
          <input type="file" accept="audio/*" onChange={handleChangeFile} className="p-2 text-lg bg-light-grey text-white" />
        </div>
        <div className="flex flex-col mb-10">
          <label className="text-lg font-bold border-b-2 border-white/30 mb-2">Weapons</label>
          <div className="flex flex-wrap gap-3">
            {allWeapons.length !== 0 && weapons.map((w) => <Weapon key={w} w={allWeapons.find((fw) => fw.id === w)} action={() => handleRemoveWeapon(w)} />)}
            {weapons.length === 0 && <span className="text-white/70 pl-2">No weapon linked to this sound</span>}
          </div>

          <div className="w-full h-1 bg-dark-grey my-2" />

          <input type="text" value={query} onChange={handleChangeQuery} className="p-2 text-lg bg-light-grey text-white" placeholder="Type a weapon name" />
          <div className="flex flex-wrap gap-1 mt-2">
            {query !== '' && allWeapons
              .filter((w) => w.names.fr.toLowerCase().includes(query.toLowerCase()))
              .map((w) => <Weapon key={w.id} w={w} action={() => handleAddWeapon(w.id)} />)}
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-3 py-2 bg-light-grey text-xl font-bold tracking-wide">Submit</button>
        </div>
      </form>
    </>
  );
}

function Weapon({ w, action }) {
  return (
    <button type="button" onClick={action} className="flex items-center gap-1 p-1 bg-transparent hover:bg-light-grey border border-white/30 hover:border-white/80 transition-colors cursor-pointer">
      <WeaponIcon icon={w.icon} alt={w.names.fr} iconWatermark={w.iconWatermark} className="w-8 h-8" />
      <span className="tracking-wide text-white">{w.names.fr}</span>
    </button>
  );
}

SoundForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  sound: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  error: PropTypes.object,
};

SoundForm.defaultProps = {
  sound: null,
  error: null,
};

Weapon.propTypes = {
  w: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    iconWatermark: PropTypes.string,
    names: PropTypes.object.isRequired,
  }).isRequired,
  action: PropTypes.func.isRequired,
};
