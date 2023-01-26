import React, { useState } from 'react';

export default function InitFade() {
  const [initFade, setInitFade] = useState(true);

  if (initFade) {
    return <div className="absolute w-full h-screen bg-black backdrop-blur-lg animate-fade z-10" onAnimationEnd={() => setInitFade(false)} />;
  }

  return null;
}
