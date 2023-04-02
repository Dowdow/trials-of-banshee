/* eslint-disable no-lonely-if */
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

export function useTooltipMoveOnMouseMove(tooltipRef) {
  const mouseSpace = 20;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    function move(event) {
      if (!window.matchMedia('(pointer: fine)').matches) {
        setX(0);
        setY(0);
        return;
      }

      const wx = window.innerWidth;
      const wy = window.innerHeight;
      const mx = event.pageX;
      const my = event.pageY;
      const tx = tooltipRef.current?.offsetWidth ?? 0;
      const ty = tooltipRef.current?.offsetHeight ?? 0;

      if (mx >= wx / 2) {
        if (mx - mouseSpace - tx < 0) {
          setX(0);
        } else {
          setX(mx - tx - mouseSpace);
        }
      } else {
        if (mx + mouseSpace + tx > wx) {
          setX(wx - tx);
        } else {
          setX(mx + mouseSpace);
        }
      }

      if (my >= wy / 2) {
        if (my - ty < 0) {
          setY(0);
        } else {
          setY(my - ty);
        }
      } else {
        if (my + ty > wy) {
          setY(wy - ty);
        } else {
          setY(my);
        }
      }
    }

    function resize() {
      setX(0);
      setY(0);
    }

    window.addEventListener('mouseenter', move);
    window.addEventListener('mousemove', move);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('mouseenter', move);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('resize', resize);
    };
  });

  return { x, y };
}
