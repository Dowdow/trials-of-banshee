/* eslint-disable import/prefer-default-export */
import { bountyNameFromType } from '../utils/bounties';
import { useCurrentBounty } from './bounty';
import { useT } from './translations';

export function useTwitterIntentBounty() {
  const currentBounty = useCurrentBounty();
  const t = useT();

  const text = encodeURIComponent(t('bounty.twitter', { bounty: t(bountyNameFromType(currentBounty.type)), attempts: currentBounty.attempts }));

  const url = 'https://trials-of-banshee.com';
  const related = 'TrialsOfBanshee';

  return `https://twitter.com/intent/tweet?text=${text}&url=${url}&related=${related}`;
}
