import aspiring from '../../img/bounty/aspiring.jpg';
import daily from '../../img/bounty/daily.jpg';
import gunsmith from '../../img/bounty/gunsmith.jpg';
import secret from '../../img/bounty/secret.jpg';

export const BOUNTY_TYPE = {
  DAILY: 0,
  ASPIRING: 1,
  GUNSMITH: 2,
  SECRET: 3,
};

export function bountyNameFromType(type) {
  switch (type) {
    case BOUNTY_TYPE.DAILY:
      return 'bounty.daily';
    case BOUNTY_TYPE.ASPIRING:
      return 'bounty.aspiring';
    case BOUNTY_TYPE.GUNSMITH:
      return 'bounty.true';
    case BOUNTY_TYPE.SECRET:
      return 'bounty.secret';
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
    case BOUNTY_TYPE.SECRET:
      return 'bounty.secret.description';
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
    case BOUNTY_TYPE.SECRET:
      return secret;
    default:
      return daily;
  }
}

export function bountyPresentationFromType(type) {
  switch (type) {
    case BOUNTY_TYPE.DAILY:
      return 'trials.presentation.daily';
    case BOUNTY_TYPE.ASPIRING:
      return 'trials.presentation.aspiring';
    case BOUNTY_TYPE.GUNSMITH:
      return 'trials.presentation.gunsmith';
    default:
      return 'bounty.unknown.description';
  }
}
