import { useEffect, useState } from 'react';

export function useInterfaceMoveOnMouseMove() {
  const maxMove = 10;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function update(event) {
    if (!window.matchMedia('(pointer: fine)').matches) {
      setX(0);
      setY(0);
      return;
    }

    const wx = window.innerWidth;
    const wy = window.innerHeight;
    const maxMoveX = (wx / wy) >= 1 ? maxMove : maxMove * (wx / wy);
    const maxMoveY = (wy / wx) >= 1 ? maxMove : maxMove * (wy / wx);
    const mx = event.pageX;
    const my = event.pageY;

    if (mx >= wx / 2) {
      const percent = (mx - (wx / 2)) / (wx - (wx / 2));
      setX(maxMoveX * percent * -1);
    } else {
      const percent = 1 - ((mx - 0) / ((wx / 2) - 0));
      setX(maxMoveX * percent);
    }

    if (my >= wy / 2) {
      const percent = (my - (wy / 2)) / (wy - (wy / 2));
      setY(maxMoveY * percent * -1);
    } else {
      const percent = 1 - ((my - 0) / ((wy / 2) - 0));
      setY(maxMoveY * percent);
    }
  }

  function resize() {
    setX(0);
    setY(0);
  }

  useEffect(() => {
    window.addEventListener('mouseenter', update);
    window.addEventListener('mousemove', update);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('mouseenter', update);
      window.removeEventListener('mousemove', update);
      window.removeEventListener('resize', resize);
    };
  });

  return { x, y };
}

export default useInterfaceMoveOnMouseMove;
