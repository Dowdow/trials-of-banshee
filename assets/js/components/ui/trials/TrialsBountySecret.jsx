import React from 'react';
import { useT } from '../../../hooks/translations';
import { BOUNTY_TYPE, bountyDescriptionFromType, bountyImageFromType, bountyNameFromType } from '../../../utils/bounties';
import Tooltipable from '../Tooltipable';

export default function TrialsBountySecret() {
  const t = useT();
  return (
    <Tooltipable>
      {(onMouseEnter, onMouseLeave) => (
        <div
          type="button"
          className="p-0.5 border-2 border-transparent disabled:hover:border-white/30 hover:border-white/70 transition-colors duration-300"
          onMouseEnter={() => onMouseEnter(t(bountyNameFromType(BOUNTY_TYPE.SECRET)), t(bountyDescriptionFromType(BOUNTY_TYPE.SECRET)))}
          onMouseLeave={() => onMouseLeave()}
        >
          <div className="relative overflow-hidden bg-white">
            <img
              src={bountyImageFromType(BOUNTY_TYPE.SECRET)}
              alt={t(bountyNameFromType(BOUNTY_TYPE.SECRET))}
              className="hover:opacity-70 transition-opacity duration-300"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </Tooltipable>
  );
}
