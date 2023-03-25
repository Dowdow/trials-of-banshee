import React, { useState } from 'react';

export default function OrbitInformations() {
  const [hover, setHover] = useState(false);

  return (
    <button type="button" title="Coming soon" className="w-24 h-24 p-1 border-2 border-white/30 border-dotted rounded-full" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className={`w-full h-full border-2 border-white/90 rounded-full transition-colors duration-300 ${hover ? 'bg-white/10' : 'bg-transparent'}`}>
        <div className="h-full flex flex-col justify-center items-center gap-y-1">
          <div className="w-3 h-3 bg-white" />
          <div className="w-3 h-10 bg-white" />
        </div>
      </div>
    </button>
  );
}
