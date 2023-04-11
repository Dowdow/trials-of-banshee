import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getWeapons } from '../actions/weapons';
import { ROUTES } from '../utils/routes';
import CollectionPage from './pages/CollectionPage';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';
import Tooltip from './ui/Tooltip';
import TrialsPage from './pages/TrialsPage';
import TriumphsPage from './pages/TriumphsPage';
import WeaponsPage from './pages/WeaponsPage';

const PanelPage = lazy(() => import('./pages/PanelPage'));
const SoundAddPage = lazy(() => import('./pages/SoundAddPage'));
const SoundEditPage = lazy(() => import('./pages/SoundEditPage'));
const SoundsPage = lazy(() => import('./pages/SoundsPage'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeapons());
  }, []);

  return (
    <Suspense fallback="Loading">
      <Routes>
        <Route path={ROUTES.INDEX} element={<IndexPage />} />
        <Route path={ROUTES.COLLECTION} element={<CollectionPage />} />
        <Route path={ROUTES.PANEL} element={<PanelPage />} />
        <Route path={ROUTES.SOUND_ADD} element={<SoundAddPage />} />
        <Route path={ROUTES.SOUND_EDIT} element={<SoundEditPage />} />
        <Route path={ROUTES.SOUNDS} element={<SoundsPage />} />
        <Route path={ROUTES.TRIALS} element={<TrialsPage />} />
        <Route path={ROUTES.TRIUMPHS} element={<TriumphsPage />} />
        <Route path={ROUTES.WEAPONS} element={<WeaponsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Tooltip />
    </Suspense>
  );
}
