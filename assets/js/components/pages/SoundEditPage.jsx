import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { editSound, getSoundId } from '../../actions/sounds';
import { useT } from '../../hooks/translations';
import { useUserAdmin } from '../../hooks/user';
import { ROUTES, ROUTES_API } from '../../utils/routes';
import EscapeLink from '../ui/clickable/EscapeLink';
import SoundForm from '../ui/SoundForm';

export default function SoundEditPage() {
  const admin = useUserAdmin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const t = useT();

  const { id } = useParams();
  const sound = useSelector((state) => state.sounds.find((s) => s.id === parseInt(id, 10)));

  const [error, setError] = useState(null);

  useEffect(() => {
    if (admin && sound === undefined) {
      dispatch(getSoundId(id));
    }
  }, []);

  const handleSubmit = (payload) => {
    setError(null);
    fetch(generatePath(ROUTES_API.SOUND_EDIT, { id }), { method: 'POST', body: payload })
      .then((response) => response.json())
      .then((data) => {
        dispatch(editSound(data));
        navigate(ROUTES.SOUNDS);
      })
      .catch((err) => setError(err));
  };

  if (!admin) return null;
  if (sound === undefined) return <div>Sound not found</div>;
  return (
    <div className="bg-dark min-h-screen">
      <div className="sticky top-0 flex justify-between items-center flex-wrap gap-3 md:gap-6 w-full bg-gray-dark p-3 md:p-5">
        <div>
          <h1 className="mb-1 md:mb-3 font-neue-haas-display-bold text-5xl md:text-6xl text-white">Edit a Sound</h1>
          <div className="w-full h-0.5 bg-white/50" />
        </div>
        <nav className="flex flex-wrap gap-3">
          <EscapeLink route={ROUTES.SOUNDS} text={t('back')} />
        </nav>
      </div>
      <div className="container mx-auto">
        <SoundForm onSubmit={handleSubmit} sound={sound} error={error} />
      </div>
    </div>
  );
}
