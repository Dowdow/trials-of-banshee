import React from 'react';
import emptyItem from '../../../../img/item/empty_item.png';

export default function ItemEmpty() {
  return <img src={emptyItem} alt="Empty item" className="w-24 h-24 border border-white/30" />;
}
