import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { postClue } from '../../../actions/bounties';
import { useCurrentBounty } from '../../../hooks/bounty';
import { CLUE_TYPE } from '../../../utils/bounties';
import CategoryTitle from '../CategoryTitle';
import TrialsClue from './TrialsClue';

export default function TrialsClues() {
  const currentBounty = useCurrentBounty();
  const dispatch = useDispatch();

  const clueRarityUsed = useMemo(() => currentBounty.clues[CLUE_TYPE.RARITY] !== undefined, [currentBounty]);
  const clueDamageTypeUsed = useMemo(() => currentBounty.clues[CLUE_TYPE.DAMAGE_TYPE] !== undefined, [currentBounty]);
  const clueWeaponTypeUsed = useMemo(() => currentBounty.clues[CLUE_TYPE.WEAPON_TYPE] !== undefined, [currentBounty]);
  const clueRarityDisabled = useMemo(() => currentBounty.completed || clueRarityUsed || currentBounty.attempts < 2, [currentBounty, clueRarityUsed]);
  const clueDamageTypeDisabled = useMemo(() => currentBounty.completed || clueDamageTypeUsed || currentBounty.attempts < 4, [currentBounty, clueDamageTypeUsed]);
  const clueWeaponTypeDisabled = useMemo(() => currentBounty.completed || clueWeaponTypeUsed || currentBounty.attempts < 6, [currentBounty, clueWeaponTypeUsed]);

  const handleClickClue = (clueType) => {
    dispatch(postClue(currentBounty.id, clueType));
  };

  return (
    <section>
      <CategoryTitle title="Clues" />
      <div className="flex gap-1 mt-4 -ml-1">
        <TrialsClue type={CLUE_TYPE.RARITY} used={clueRarityUsed} disabled={clueRarityDisabled} onClick={() => handleClickClue(CLUE_TYPE.RARITY)} />
        <TrialsClue type={CLUE_TYPE.DAMAGE_TYPE} used={clueDamageTypeUsed} disabled={clueDamageTypeDisabled} onClick={() => handleClickClue(CLUE_TYPE.DAMAGE_TYPE)} />
        <TrialsClue type={CLUE_TYPE.WEAPON_TYPE} used={clueWeaponTypeUsed} disabled={clueWeaponTypeDisabled} onClick={() => handleClickClue(CLUE_TYPE.WEAPON_TYPE)} />
      </div>
    </section>
  );
}
