import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { updateBounty } from '../../../actions/bounties';
import { useCurrentBounty } from '../../../hooks/bounty';
import { CLUE_TYPE } from '../../../utils/bounties';
import { ROUTES_API } from '../../../utils/routes';
import { WEAPON_DAMAGE_TYPE_IMAGE, WEAPON_DAMAGE_TYPE_NAME, WEAPON_RARITY_IMAGE, WEAPON_RARITY_NAME, WEAPON_TYPE_NAME } from '../../../utils/weapons';
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
    fetch(generatePath(ROUTES_API.BOUNTY_CLUE, { id: currentBounty.id }), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clueType }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(updateBounty(data)));
  };

  return (
    <section>
      <CategoryTitle title="Clues" />
      <div className="flex gap-1 mt-4 -ml-1">
        <TrialsClue used={clueRarityUsed} disabled={clueRarityDisabled} onClick={() => handleClickClue(CLUE_TYPE.RARITY)} />
        <TrialsClue used={clueDamageTypeUsed} disabled={clueDamageTypeDisabled} onClick={() => handleClickClue(CLUE_TYPE.DAMAGE_TYPE)} />
        <TrialsClue used={clueWeaponTypeUsed} disabled={clueWeaponTypeDisabled} onClick={() => handleClickClue(CLUE_TYPE.WEAPON_TYPE)} />
      </div>
      <div className="flex items-start flex-wrap gap-3 mt-2.5 text-lg">
        {currentBounty.clues.rarity ? (
          <div className="flex items-center gap-1 pr-1 text-white/70 border border-white/70 select-none">
            <img src={WEAPON_RARITY_IMAGE[currentBounty.clues.rarity]} alt={WEAPON_RARITY_NAME[currentBounty.clues.rarity]} className="w-8 h-8" />
            <div className="text-white/70">{WEAPON_RARITY_NAME[currentBounty.clues.rarity]}</div>
          </div>
        ) : (
          <div className="px-1 py-0.5 text-white/70 border border-white/70 select-none">Clue #1</div>
        )}
        {currentBounty.clues.damageType ? (
          <div className="flex items-center gap-1 pr-1 text-white/70 border border-white/70 select-none">
            <img src={WEAPON_DAMAGE_TYPE_IMAGE[currentBounty.clues.damageType]} alt={WEAPON_DAMAGE_TYPE_NAME[currentBounty.clues.damageType]} className="w-8 h-8" />
            <div className="text-white/70">{WEAPON_DAMAGE_TYPE_NAME[currentBounty.clues.damageType]}</div>
          </div>
        ) : (
          <div className="px-1 py-0.5 text-white/70 border border-white/70 select-none">Clue #2</div>
        )}
        {currentBounty.clues.weaponType ? (
          <div className="px-1 py-0.5 text-white/70 border border-white/70 select-none">{WEAPON_TYPE_NAME[currentBounty.clues.weaponType]}</div>
        ) : (
          <div className="px-1 py-0.5 text-white/70 border border-white/70 select-none">Clue #3</div>
        )}
      </div>
    </section>
  );
}
