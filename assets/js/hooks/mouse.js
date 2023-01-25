import { useEffect, useState } from 'react';

export function useInterfaceMoveOnMouseMove() {
  const maxMove = 10;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function update(event) {
    const wx = window.innerWidth;
    const wy = window.innerHeight;
    const mx = event.pageX;
    const my = event.pageY;

    if (mx >= wx / 2) {
      const percent = (mx - (wx / 2)) / (wx - (wx / 2));
      setX(maxMove * percent * -1);
    } else {
      const percent = 1 - ((mx - 0) / ((wx / 2) - 0));
      setX(maxMove * percent);
    }

    if (my >= wy / 2) {
      const percent = (my - (wy / 2)) / (wy - (wy / 2));
      setY(maxMove * percent * -1);
    } else {
      const percent = 1 - ((my - 0) / ((wy / 2) - 0));
      setY(maxMove * percent);
    }
  }

  useEffect(() => {
    window.addEventListener('mouseenter', update);
    window.addEventListener('mousemove', update);
    return () => {
      window.removeEventListener('mouseenter', update);
      window.removeEventListener('mousemove', update);
    };
  });

  return { x, y };
}

export default useInterfaceMoveOnMouseMove;
