import React from 'react';
import { useT } from '../../../hooks/translations';
import mouse from '../../../../img/misc/mouse.png';

export default function LeftClick() {
  const t = useT();
  return (
    <div className="w-6 h-6 flex justify-center items-center">
      <img src={mouse} alt={t('click.left')} className="w-full h-full object-contain" />
    </div>
  );
}
