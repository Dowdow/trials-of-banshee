import aspiring from '../../img/bounty/aspiring.jpg';
import daily from '../../img/bounty/daily.jpg';
import gunsmith from '../../img/bounty/gunsmith.jpg';

export const BOUNTY_TYPE = {
  DAILY: 0,
  ASPIRING: 1,
  GUNSMITH: 2,
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
