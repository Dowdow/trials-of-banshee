/* eslint-disable import/prefer-default-export */
import { bountyNameFromType } from '../utils/bounties';
import { useCurrentBounty } from './bounty';

export function useTwitterIntentBounty() {
  const currentBounty = useCurrentBounty();

  const text = encodeURIComponent(`#TrialsOfBanshee ${bountyNameFromType(currentBounty.type)} completed in ${currentBounty.attempts} attempt(s) !\n\n`);

  const url = 'https://trials-of-banshee.com';
  const related = 'TrialsOfBanshee';

  return `https://twitter.com/intent/tweet?text=${text}&url=${url}&related=${related}`;
}
