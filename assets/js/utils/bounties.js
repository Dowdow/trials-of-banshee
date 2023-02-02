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
      return 'Daily Bounty';
    case BOUNTY_TYPE.ASPIRING:
      return 'Aspiring Gunsmith Bounty';
    case BOUNTY_TYPE.GUNSMITH:
      return 'True Gunsmith Bounty';
    default:
      return 'Daily Bounty';
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
