export const LOCALSTORAGE_BOUNTIES_KEY = 'COMPLETED_BOUNTIES';

export function isBountyCompleted(id) {
  const bounties = localStorage.getItem(LOCALSTORAGE_BOUNTIES_KEY);
  if (bounties === null) {
    return false;
  }

  const json = JSON.parse(bounties);
  if (typeof json === 'object' && json !== null && Object.prototype.hasOwnProperty.call(json, id)) {
    return json[id] || false;
  }

  return false;
}

export function addCompletedBounty(id, completed) {
  const bounties = localStorage.getItem(LOCALSTORAGE_BOUNTIES_KEY);
  if (bounties === null) {
    const completedBounty = { [id]: completed };
    localStorage.setItem(LOCALSTORAGE_BOUNTIES_KEY, JSON.stringify(completedBounty));
  }

  const json = JSON.parse(bounties);
  if (typeof json === 'object' && json !== null) {
    json[id] = completed;
    localStorage.setItem(LOCALSTORAGE_BOUNTIES_KEY, JSON.stringify(json));
  }
}
