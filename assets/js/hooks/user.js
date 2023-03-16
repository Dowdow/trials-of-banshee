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

  return { nb, total, percent: (nb / total) * 100, completed: nb === total };
}
