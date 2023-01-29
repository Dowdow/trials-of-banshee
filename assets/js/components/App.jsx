import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setWeapons } from '../actions/weapons';
import { ROUTES, ROUTES_API } from '../utils/routes';
import CollectionPage from './pages/CollectionPage';
import IndexPage from './pages/IndexPage';
import SoundAddPage from './pages/SoundAddPage';
import SoundEditPage from './pages/SoundEditPage';
import SoundsPage from './pages/SoundsPage';
import TrialsPage from './pages/TrialsPage';
import TriumphsPage from './pages/TriumphsPage';
import WeaponsPage from './pages/WeaponsPage';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(ROUTES_API.WEAPONS)
      .then((res) => res.json())
      .then((data) => dispatch(setWeapons(data.items)));
  }, []);

  return (
    <Routes>
      <Route path={ROUTES.INDEX} element={<IndexPage />} />
      <Route path={ROUTES.COLLECTION} element={<CollectionPage />} />
      <Route path={ROUTES.SOUND_ADD} element={<SoundAddPage />} />
      <Route path={ROUTES.SOUND_EDIT} element={<SoundEditPage />} />
      <Route path={ROUTES.SOUNDS} element={<SoundsPage />} />
      <Route path={ROUTES.TRIALS} element={<TrialsPage />} />
      <Route path={ROUTES.TRIUMPHS} element={<TriumphsPage />} />
      <Route path={ROUTES.WEAPONS} element={<WeaponsPage />} />
    </Routes>
  );
}
