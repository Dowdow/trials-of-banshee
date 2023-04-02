import { useEffect, useState } from 'react';

/* eslint-disable import/prefer-default-export */
export function useNextBountiesCounter() {
  const [hoursLeft, setHoursLeft] = useState('23');
  const [minutesLeft, setMinutesLeft] = useState('59');
  const [secondsLeft, setSecondsLeft] = useState('59');

  useEffect(() => {
    const nextDate = new Date();
    const utcHour = nextDate.getUTCHours();
    if (utcHour >= 17) {
      nextDate.setUTCDate(nextDate.getUTCDate() + 1);
    }
    nextDate.setUTCHours(17, 0, 0, 0);

    const interval = setInterval(() => {
      const currentDate = new Date();
      const differenceSeconds = Math.floor((nextDate.getTime() - currentDate.getTime()) / 1000);
      if (differenceSeconds >= 0) {
        setHoursLeft(`${Math.floor(differenceSeconds / 3600)}`.padStart(2, '0'));
        setMinutesLeft(`${Math.floor((differenceSeconds % 3600) / 60)}`.padStart(2, '0'));
        setSecondsLeft(`${(differenceSeconds % 3600) % 60}`.padStart(2, '0'));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { hoursLeft, minutesLeft, secondsLeft };
}
