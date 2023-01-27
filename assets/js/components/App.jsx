import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import TrialsPage from './pages/TrialsPage';
import WeaponsPage from './pages/WeaponsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/trials" element={<TrialsPage />} />
      <Route path="/weapons" element={<WeaponsPage />} />
    </Routes>
  );
}
