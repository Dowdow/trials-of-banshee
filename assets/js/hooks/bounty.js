import { useSelector } from 'react-redux';

export function useTodayBounties() {
  return useSelector((state) => state.bounties.items);
}

export function useCurrentBounty() {
  return useSelector((state) => state.bounties.items.find((bounty) => bounty.id === state.bounties.current));
}

export function useTodayBoutiesCompletion() {
  return useSelector((state) => state.bounties.completions);
}

export function usePossibleWeapons() {
  const currentBounty = useCurrentBounty();
  const weapons = useSelector((state) => state.weapons
    .filter((w) => !currentBounty.history.includes(w.id))
    .filter((w) => (currentBounty.knowledge.include.rarity.length > 0 ? currentBounty.knowledge.include.rarity.includes(w.rarity) : true))
    .filter((w) => (currentBounty.knowledge.include.damageType.length > 0 ? currentBounty.knowledge.include.damageType.includes(w.damageType) : true))
    .filter((w) => (currentBounty.knowledge.include.weaponType.length > 0 ? currentBounty.knowledge.include.weaponType.includes(w.type) : true))
    .filter((w) => !currentBounty.knowledge.exclude.rarity.includes(w.rarity))
    .filter((w) => !currentBounty.knowledge.exclude.damageType.includes(w.damageType)))
    .filter((w) => !currentBounty.knowledge.exclude.weaponType.includes(w.type));

  return weapons;
}
