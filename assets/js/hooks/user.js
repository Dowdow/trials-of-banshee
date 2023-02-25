import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export function useUser() {
  return useSelector((state) => state.user);
}

export function useAuthenticated() {
  return useSelector((state) => state.user.authenticated);
}

export function useAdmin() {
  return useSelector((state) => state.user.admin);
}

export function useEngramCollection() {
  return useSelector((state) => state.user.collections.engrams ?? {});
}

export function useTriumphs() {
  return useSelector((state) => state.user.triumphs ?? {});
}

export function useSeal() {
  const triumphs = useTriumphs();
  const total = 6;

  const collectionBadge = triumphs.collectionBadge ?? false;
  const bounties = triumphs.bounties ?? 0;
  const aspiringBounties = triumphs.aspiringBounties ?? 0;
  const trueGunsmithBounties = triumphs.trueGunsmithBounties ?? 0;
  const perfectMatches = triumphs.perfectMatches ?? 0;
  const xurBounty = triumphs.xurBounty ?? false;

  const nb = useMemo(() => {
    let i = 0;
    if (collectionBadge) i += 1;
    if (bounties >= 100) i += 1;
    if (aspiringBounties >= 25) i += 1;
    if (trueGunsmithBounties >= 10) i += 1;
    if (perfectMatches >= 75) i += 1;
    if (xurBounty) i += 1;
    return i;
  }, [triumphs]);

  return { nb, total, percent: (nb / total) * 100, completed: nb === total };
}
