import { SET_WEAPON_FILTERS_DAMAGE_TYPE, SET_WEAPON_FILTERS_HAS_SOUND, SET_WEAPON_FILTERS_QUERY, SET_WEAPON_FILTERS_RARITY, SET_WEAPON_FILTERS_TYPE } from '../actions/weaponFilters';

const init = { damageType: 0, hasSound: 0, query: '', rarity: 0, type: 0 };

export default function weaponFilter(state = init, action = {}) {
  switch (action.type) {
    case SET_WEAPON_FILTERS_DAMAGE_TYPE:
      return { ...state, damageType: action.payload };
    case SET_WEAPON_FILTERS_HAS_SOUND:
      return { ...state, hasSound: action.payload };
    case SET_WEAPON_FILTERS_QUERY:
      return { ...state, query: action.payload };
    case SET_WEAPON_FILTERS_RARITY:
      return { ...state, rarity: action.payload };
    case SET_WEAPON_FILTERS_TYPE:
      return { ...state, type: action.payload };
    default:
      return state;
  }
}
