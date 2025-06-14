import React from 'react';
import { useT } from '../../../hooks/translations';
import { useUserXurBountyClaimable } from '../../../hooks/user';
import { BOUNTY_TYPE, bountyDescriptionFromType, bountyImageFromType, bountyNameFromType } from '../../../utils/bounties';
import Tooltipable from '../Tooltipable';

export default function TrialsBountySecret() {
  const completed = useUserXurBountyClaimable();
  const t = useT();
  return (
    <Tooltipable title={bountyNameFromType(BOUNTY_TYPE.SECRET)} description={bountyDescriptionFromType(BOUNTY_TYPE.SECRET)}>
      {(ref) => (
        <div
          ref={ref}
          className={`p-0.5 border-2 border-transparent ${completed ? 'hover:border-white/30' : 'hover:border-white/70'} transition-colors duration-300 cursor-help`}
        >
          <div className={`relative overflow-hidden ${completed ? 'bg-gray-dark' : 'bg-white'}`}>
            <img
              src={bountyImageFromType(BOUNTY_TYPE.SECRET)}
              alt={t(bountyNameFromType(BOUNTY_TYPE.SECRET))}
              className={`${completed && 'opacity-70'} hover:opacity-70 transition-opacity duration-300`}
              loading="lazy"
            />
            {completed && (
              <>
                <div className="absolute -bottom-10 -right-10 bg-yellow h-20 w-20 rotate-45" />
                <div className="absolute bottom-3.5 right-2.5 h-2.5 w-4 border-l-4 border-b-4 border-white -rotate-45" />
              </>
            )}
          </div>
        </div>
      )}
    </Tooltipable>
  );
}
