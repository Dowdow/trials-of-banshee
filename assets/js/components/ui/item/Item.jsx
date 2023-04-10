import React from 'react';
import PropTypes from 'prop-types';
import { useT } from '../../../hooks/translations';
import { ITEMS, ITEM_IMAGES } from '../../../utils/collections';
import ItemEmpty from './ItemEmpty';
import Tooltipable from '../Tooltipable';

export default function Item({ type, active = false }) {
  const t = useT();

  if (!active) {
    return <ItemEmpty />;
  }

  return (
    <Tooltipable>
      {(onMouseEnter, onMouseLeave) => (
        <img
          src={ITEM_IMAGES[type]}
          alt={t(ITEMS[type])}
          className="w-24 h-24 border border-white/30 hover:brightness-125 transition-all duration-300"
          onMouseEnter={() => onMouseEnter(t(ITEMS[type]), t('items.description'))}
          onMouseLeave={() => onMouseLeave()}
        />
      )}
    </Tooltipable>
  );
}

Item.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
