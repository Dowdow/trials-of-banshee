import { WEAPON_DAMAGE_TYPE_NAME, WEAPON_RARITY_NAME, WEAPON_TYPE_NAME } from './weapons';
import aspiring from '../../img/bounty/aspiring.jpg';
import daily from '../../img/bounty/daily.jpg';
import gunsmith from '../../img/bounty/gunsmith.jpg';

export const BOUNTY_TYPE = {
  DAILY: 0,
  ASPIRING: 1,
  GUNSMITH: 2,
};

export const CLUE_TYPE = {
  RARITY: 'rarity',
  DAMAGE_TYPE: 'damageType',
  WEAPON_TYPE: 'weaponType',
};

export function bountyNameFromType(type) {
  switch (type) {
    case BOUNTY_TYPE.DAILY:
      return 'bounty.daily';
    case BOUNTY_TYPE.ASPIRING:
      return 'bounty.aspiring';
    case BOUNTY_TYPE.GUNSMITH:
      return 'bounty.true';
    default:
      return 'bounty.unknown';
  }
}

export function bountyDescriptionFromType(type) {
  switch (type) {
    case BOUNTY_TYPE.DAILY:
      return 'bounty.daily.description';
    case BOUNTY_TYPE.ASPIRING:
      return 'bounty.aspiring.description';
    case BOUNTY_TYPE.GUNSMITH:
      return 'bounty.true.description';
    default:
      return 'bounty.unknown.description';
  }
}

export function bountyImageFromType(type) {
  switch (type) {
    case BOUNTY_TYPE.DAILY:
      return daily;
    case BOUNTY_TYPE.ASPIRING:
      return aspiring;
    case BOUNTY_TYPE.GUNSMITH:
      return gunsmith;
    default:
      return daily;
  }
}

export function clueNameFromType(type) {
  switch (type) {
    case CLUE_TYPE.RARITY:
      return 'clue.rarity';
    case CLUE_TYPE.DAMAGE_TYPE:
      return 'clue.damage';
    case CLUE_TYPE.WEAPON_TYPE:
      return 'clue.weapon';
    default:
      return 'clue.unknown';
  }
}

export function clueDescriptionFromType(type) {
  switch (type) {
    case CLUE_TYPE.RARITY:
      return 'clue.rarity.description';
    case CLUE_TYPE.DAMAGE_TYPE:
      return 'clue.damage.description';
    case CLUE_TYPE.WEAPON_TYPE:
      return 'clue.weapon.description';
    default:
      return 'clue.unknown.description';
  }
}

export function clueValueFromTypeAndData(type, clues) {
  switch (type) {
    case CLUE_TYPE.RARITY:
      return WEAPON_RARITY_NAME[clues.rarity];
    case CLUE_TYPE.DAMAGE_TYPE:
      return WEAPON_DAMAGE_TYPE_NAME[clues.damageType];
    case CLUE_TYPE.WEAPON_TYPE:
      return WEAPON_TYPE_NAME[clues.weaponType];
    default:
      return 'clue.unknown';
  }
}
