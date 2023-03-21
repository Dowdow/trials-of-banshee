import React from 'react';
import PropTypes from 'prop-types';
import { ITEMS, ITEM_IMAGES } from '../../../utils/collections';
import ItemEmpty from './ItemEmpty';

export default function Item({ type, active = false }) {
  if (!active) {
    return <ItemEmpty />;
  }
  return <img src={ITEM_IMAGES[type]} alt={ITEMS[type]} className="w-24 h-24 border border-white/30 hover:brightness-125 transition-all duration-300" />;
}

Item.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
