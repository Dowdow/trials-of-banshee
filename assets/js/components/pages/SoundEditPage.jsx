import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, Link, useParams } from 'react-router-dom';
import { editSound } from '../../actions/sounds';
import { ROUTES, ROUTES_API } from '../../utils/routes';
import KeyboardButton from '../ui/KeyboardButton';
import SoundForm from '../ui/SoundForm';

export default function SoundEditPage() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const sound = useSelector((state) => state.sounds.find((s) => s.id === id));

  const [error, setError] = useState(null);

  const handleSubmit = (payload) => {
    setError(null);
    fetch(generatePath(ROUTES_API.SOUND_EDIT, { id }), { method: 'POST', body: payload })
      .then((response) => response.json())
      .then((data) => dispatch(editSound(id, data)))
      .catch((err) => setError(err));
  };

  if (sound === null) {
    return <div>Sound not found</div>;
  }

  return (
    <div className="bg-dark min-h-screen">
      <div className="sticky top-0 flex justify-between items-center gap-6 w-full bg-dark-grey p-5">
        <div>
          <h1 className="mb-3 font-neue-haas-display-bold text-6xl text-white">Edit a Sound</h1>
          <div className="w-full h-0.5 bg-white/50" />
        </div>
        <nav className="flex gap-3">
          <Link to={ROUTES.SOUNDS} className="flex items-center gap-2 px-1 py-0.5 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
            <KeyboardButton button="B" />
            <span className="text-xl tracking-wide text-white/80">Back</span>
          </Link>
        </nav>
      </div>
      <div className="container mx-auto">
        <SoundForm onSubmit={handleSubmit} sound={sound} error={error} />
      </div>
    </div>
  );
}
