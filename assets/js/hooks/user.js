/* eslint-disable no-restricted-syntax */
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useCollectionEngramsDefault, useCollectionItemsDefault } from './default';

export function useUser() {
  return useSelector((state) => state.user);
}

export function useUserAuthenticated() {
  return useSelector((state) => state.user.authenticated);
}

export function useUserAdmin() {
  return useSelector((state) => state.user.admin);
}

export function useUserEngramsCollection() {
  return useSelector((state) => state.user.collections.engrams ?? {});
}

export function useUserItemsCollection() {
  return useSelector((state) => state.user.collections.items ?? {});
}

export function useUserTriumphs() {
  return useSelector((state) => state.user.triumphs ?? {});
}

export function useUserCollectionBadgeClaimable() {
  const allEngrams = useCollectionEngramsDefault();
  const allItems = useCollectionItemsDefault();
  const userEngrams = useUserEngramsCollection();
  const userItems = useUserItemsCollection();

  const engramsOk = useMemo(() => {
    for (const engram of allEngrams) {
      if (userEngrams[engram] === undefined || !userEngrams[engram]) {
        return false;
      }
    }
    return true;
  }, [allEngrams, userEngrams]);

  const itemsOk = useMemo(() => {
    for (const item of allItems) {
      if (userItems[item] === undefined || !userItems[item]) {
        return false;
      }
    }

    return true;
  }, [allItems, userItems]);

  return engramsOk && itemsOk;
}

export function useUserXurBountyClaimable() {
  const userItems = useUserItemsCollection();
  return userItems.xurGrassItem ?? false;
}

export function useUserSeal() {
  const triumphs = useUserTriumphs();
  const completed = triumphs.gunsmithTitle ?? false;
  const total = 6;

  const nb = useMemo(() => {
    let i = 0;
    if (triumphs.collectionBadge ?? false) i += 1;
    if (triumphs.bountiesClaimed ?? false) i += 1;
    if (triumphs.aspiringBountiesClaimed ?? false) i += 1;
    if (triumphs.trueGunsmithBountiesClaimed ?? false) i += 1;
    if (triumphs.perfectMatchesClaimed ?? false) i += 1;
    if (triumphs.xurBounty) i += 1;
    return i;
  }, [triumphs]);

  return {
    nb,
    total,
    percent: (nb / total) * 100,
    claimable: !completed && nb === total,
    completed,
  };
}
