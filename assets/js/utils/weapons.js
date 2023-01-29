import arc from '../../img/damage/arc.png';
import arcTransparent from '../../img/damage/arc_trans.png';
import kinetic from '../../img/damage/kinetic.png';
import kineticTransparent from '../../img/damage/kinetic_trans.png';
import solar from '../../img/damage/solar.png';
import solarTransparent from '../../img/damage/solar_trans.png';
import stasis from '../../img/damage/stasis.png';
import stasisTransparent from '../../img/damage/stasis_trans.png';
import voidD from '../../img/damage/void.png';
import voidTransparent from '../../img/damage/void_trans.png';

export const WEAPON_DAMAGE_TYPE = {
  KINETIC: 1,
  ARC: 2,
  SOLAR: 3,
  VOID: 4,
  STASIS: 6,
};

export const WEAPON_DAMAGE_TYPE_NAME = {
  1: 'Kinetic',
  2: 'Arc',
  3: 'Solar',
  4: 'Void',
  6: 'Stasis',
};

export const WEAPON_DAMAGE_TYPE_IMAGE = {
  1: kinetic,
  2: arc,
  3: solar,
  4: voidD,
  6: stasis,
};

export const WEAPON_DAMAGE_TYPE_IMAGE_TRANSPARENT = {
  1: kineticTransparent,
  2: arcTransparent,
  3: solarTransparent,
  4: voidTransparent,
  6: stasisTransparent,
};

export const WEAPON_RARITY = {
  BASIC: 2,
  COMMON: 3,
  RARE: 4,
  LEGENDARY: 5,
  EXOTIC: 6,
};

export const WEAPON_TYPE = {
  AUTO: 6,
  SHOTGUN: 7,
  MACHINEGUN: 8,
  HAND_CANNON: 9,
  ROCKET_LAUNCHER: 10,
  FUSION: 11,
  SNIPER: 12,
  PULSE: 13,
  SCOUT: 14,
  SIDEARM: 17,
  SWORD: 18,
  LINEAR_FUSION: 22,
  GRENADE_LAUNCHER: 23,
  SUBMACHINE_GUN: 24,
  TRACE: 25,
  BOW: 31,
  GLAIVE: 33,
};

export const WEAPON_TYPE_NAME = {
  6: 'Auto Rifle',
  7: 'Shotgun',
  8: 'Machine Gun',
  9: 'Hand Cannon',
  10: 'Rocket Launcher',
  11: 'Fusion Rifle',
  12: 'Sniper Rifle',
  13: 'Pulse Rifle',
  14: 'Scout Rifle',
  17: 'Sidearm',
  18: 'Sword',
  22: 'Linear Fusion Rifle',
  23: 'Grenade Launcher',
  24: 'Submachine Gun',
  25: 'Trace Rifle',
  31: 'Bow',
  33: 'Glaive',
};
