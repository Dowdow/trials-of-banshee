import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentBounty } from '../../actions/bounties';
import KeyboardButton from './KeyboardButton';

export default function TrialsBack() {
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(setCurrentBounty(null));
  };

  return (
    <div className="flex justify-end items-center gap-3 pt-3">
      <button type="button" onClick={handleBack} className="flex items-center gap-2 px-1 border-2 border-transparent hover:border-white/70 transition-colors duration-300">
        <KeyboardButton button="B" />
        <span className="text-2xl tracking-wide text-white/80">Back</span>
      </button>
    </div>
  );
}
