import React from 'react';
import mouse from '../../../../img/misc/mouse.png';

export default function LeftClick() {
  return (
    <div className="w-6 h-6 flex justify-center items-center">
      <img src={mouse} alt="Left click mouse button" className="w-full h-full object-contain" />
    </div>
  );
}
