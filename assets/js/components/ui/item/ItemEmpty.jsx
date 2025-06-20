import React from 'react';
import { useT } from '../../../hooks/translations';
import Tooltipable from '../Tooltipable';
import emptyItem from '../../../../img/item/empty_item.png';

export default function ItemEmpty() {
  const t = useT();

  return (
    <Tooltipable>
      {(ref) => (
        <img
          ref={ref}
          src={emptyItem}
          alt={t('item.empty')}
          className="w-24 h-24 border border-white/30"
        />
      )}
    </Tooltipable>
  );
}
