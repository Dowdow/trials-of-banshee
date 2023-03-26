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
