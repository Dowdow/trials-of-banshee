import React from 'react';
import emptyItem from '../../../../img/item/empty_item.png';
import { useT } from '../../../hooks/translations';

export default function ItemEmpty() {
  const t = useT();
  return <img src={emptyItem} alt={t('item.empty')} className="w-24 h-24 border border-white/30" />;
}
