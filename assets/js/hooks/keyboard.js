import { useEffect, useState } from 'react';

export function useEscapeKey(func) {
  const [down, setDown] = useState(false);

  function keydown(e) {
    if (down === false && e.key === 'Escape') {
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
