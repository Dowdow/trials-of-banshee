import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetTooltip } from '../actions/tooltip';

export function useEscapeKey(func) {
  const dispatch = useDispatch();

  const [down, setDown] = useState(false);

  function keydown(e) {
    if (down === false && e.key === 'Escape') {
      dispatch(resetTooltip());
      setDown(true);
      func(e);
    }
  }

  function keyup(e) {
    if (down === true && e.key === 'Escape') {
      setDown(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    return () => {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
    };
  });
}

export function useArrowKey() { }
