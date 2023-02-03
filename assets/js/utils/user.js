export const CHARACTER_CLASS = {
  CLASS_TITAN: 0,
  CLASS_HUNTER: 1,
  CLASS_WARLOCK: 2,
  CLASS_UNKNOWN: 3,
};

export const CHARACTER_GENDER = {
  GENDER_MALE: 0,
  GENDER_FEMALE: 1,
  GENDER_UNKNOWN: 2,
};

export const CHARACTER_RACE = {
  RACE_HUMAN: 0,
  RACE_AWOKEN: 1,
  RACE_EXO: 2,
  RACE_UNKNOWN: 3,
};

export function characterClassName(type) {
  switch (type) {
    case CHARACTER_CLASS.CLASS_TITAN:
      return 'Titan';
    case CHARACTER_CLASS.CLASS_HUNTER:
      return 'Hunter';
    case CHARACTER_CLASS.CLASS_WARLOCK:
      return 'Warlock';
    default:
      return 'Unknown';
  }
}

export function characterGenderName(type) {
  switch (type) {
    case CHARACTER_GENDER.GENDER_MALE:
      return 'Male';
    case CHARACTER_GENDER.GENDER_FEMALE:
      return 'Female';
    default:
      return 'Unknown';
  }
}

export function characterRaceName(type) {
  switch (type) {
    case CHARACTER_RACE.RACE_HUMAN:
      return 'Human';
    case CHARACTER_RACE.RACE_AWOKEN:
      return 'Awoken';
    case CHARACTER_RACE.RACE_EXO:
      return 'Exo';
    default:
      return 'Unknown';
  }
}
