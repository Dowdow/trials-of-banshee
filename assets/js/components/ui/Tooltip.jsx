import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTooltipMoveOnMouseMove } from '../../hooks/mouse';
import { useT } from '../../hooks/translations';

export default function Tooltip() {
  const tooltipRef = useRef();
  const { x, y } = useTooltipMoveOnMouseMove(tooltipRef);
  const t = useT();

  const { visible, header, content, connected } = useSelector((state) => state.tooltip);

  if (!window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className={`${visible ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full max-w-[474px] text-white/90 select-none pointer-events-none backdrop-blur-lg shadow-2xl shadow-dark z-50`}
      style={{ translate: `${visible ? x : 0}px ${visible ? y : 0}px` }}
    >
      <div className="h-1 w-full bg-white/60" />
      <div className="p-2 bg-dark/90 text-2xl font-bold tracking-wide uppercase">
        {header}
      </div>
      {connected && (
        <div className="p-2 bg-red/30 text-xl tracking-wide">
          {t('tooltip.connected')}
        </div>
      )}
      <div className="p-3 bg-light-grey/70 text-lg tracking-wide">
        {content}
      </div>
    </div>
  );
}
