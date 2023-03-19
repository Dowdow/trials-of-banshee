import { useSelector } from 'react-redux';

export function useCollectionEngramsDefault() {
  return useSelector((state) => state.collections.engrams);
}

export function useCollectionItemsDefault() {
  return useSelector((state) => state.collections.items);
}

export function useTriumphsDefault() {
  return useSelector((state) => state.triumphs);
}
