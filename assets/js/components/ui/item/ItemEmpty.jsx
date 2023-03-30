import React from 'react';
import { useDispatch } from 'react-redux';
import { resetTooltip, setTooltip } from '../../../actions/tooltip';
import { useT } from '../../../hooks/translations';
import emptyItem from '../../../../img/item/empty_item.png';

export default function ItemEmpty() {
  const dispatch = useDispatch();
  const t = useT();

  const handleMouseEnter = () => {
    dispatch(setTooltip('???', '???'));
  };

  const handleMouseLeave = () => {
    dispatch(resetTooltip());
  };

  return (
    <img
      src={emptyItem}
      alt={t('item.empty')}
      className="w-24 h-24 border border-white/30"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
