import React from 'react';
import { useCurrentBounty } from '../../../hooks/bounty';
import { useT } from '../../../hooks/translations';
import TrialsInputDamageType from './TrialsInputDamageType';
import TrialsInputRarity from './TrialsInputRarity';
import TrialsInputWeaponType from './TrialsInputWeaponType';
import CategoryTitle from '../CategoryTitle';

export default function TrialsClues() {
  const t = useT();

  const currentBounty = useCurrentBounty();

  const damageType = currentBounty.knowledge.include.damageType[0] ?? null;
  const weaponType = currentBounty.knowledge.include.weaponType[0] ?? null;

  return (
    <div>
      <CategoryTitle title={t('trials.clues')} />
      <div className="flex flex-col gap-y-4 mt-4">
        <TrialsInputWeaponType />
        {weaponType && <TrialsInputDamageType />}
        {damageType && <TrialsInputRarity />}
      </div>
    </div>
  );
}
