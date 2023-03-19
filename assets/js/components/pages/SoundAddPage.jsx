import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSound } from '../../actions/sounds';
import { useAdmin } from '../../hooks/user';
import { ROUTES, ROUTES_API } from '../../utils/routes';
import EscapeLink from '../ui/clickable/EscapeLink';
import SoundForm from '../ui/SoundForm';

export default function SoundAddPage() {
  const admin = useAdmin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleSubmit = (payload) => {
    setError(null);
    fetch(ROUTES_API.SOUND_ADD, { method: 'POST', body: payload })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addSound(data));
        navigate(ROUTES.SOUNDS);
      })
      .catch((err) => setError(err));
  };

  if (!admin) {
    return null;
  }

  return (
    <div className="bg-dark min-h-screen">
      <div className="sticky top-0 flex justify-between items-center flex-wrap gap-3 md:gap-6 w-full bg-dark-grey p-3 md:p-5">
        <div>
          <h1 className="mb-1 md:mb-3 font-neue-haas-display-bold text-5xl md:text-6xl text-white">Add a Sound</h1>
          <div className="w-full h-0.5 bg-white/50" />
        </div>
        <nav className="flex flex-wrap gap-3">
          <EscapeLink route={ROUTES.SOUNDS} text="Back" />
        </nav>
      </div>
      <div className="container mx-auto">
        <SoundForm onSubmit={handleSubmit} error={error} />
      </div>
    </div>
  );
}
