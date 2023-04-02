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
