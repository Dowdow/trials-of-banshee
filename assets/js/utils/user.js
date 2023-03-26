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
      return 'class.titan';
    case CHARACTER_CLASS.CLASS_HUNTER:
      return 'class.hunter';
    case CHARACTER_CLASS.CLASS_WARLOCK:
      return 'class.warlock';
    default:
      return 'class.unknown';
  }
}

export function characterGenderName(type) {
  switch (type) {
    case CHARACTER_GENDER.GENDER_MALE:
      return 'gender.male';
    case CHARACTER_GENDER.GENDER_FEMALE:
      return 'gender.female';
    default:
      return 'gender.unknown';
  }
}

export function characterRaceName(type) {
  switch (type) {
    case CHARACTER_RACE.RACE_HUMAN:
      return 'race.human';
    case CHARACTER_RACE.RACE_AWOKEN:
      return 'race.awoken';
    case CHARACTER_RACE.RACE_EXO:
      return 'race.exo';
    default:
      return 'race.unknown';
  }
}
