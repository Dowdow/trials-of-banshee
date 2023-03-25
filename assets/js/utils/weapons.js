import arc from '../../img/damage/arc.png';
import arcTransparent from '../../img/damage/arc_trans.png';
import kinetic from '../../img/damage/kinetic.png';
import kineticTransparent from '../../img/damage/kinetic_trans.png';
import solar from '../../img/damage/solar.png';
import solarTransparent from '../../img/damage/solar_trans.png';
import stasis from '../../img/damage/stasis.png';
import stasisTransparent from '../../img/damage/stasis_trans.png';
import strand from '../../img/damage/strand.png';
import strandTransparent from '../../img/damage/strand_trans.png';
import voidD from '../../img/damage/void.png';
import voidTransparent from '../../img/damage/void_trans.png';

import basic from '../../img/rarity/basic.jpg';
import common from '../../img/rarity/common.jpg';
import rare from '../../img/rarity/rare.jpg';
import legendary from '../../img/rarity/legendary.jpg';
import exotic from '../../img/rarity/exotic.jpg';

import auto from '../../img/weapon/auto.svg';
import bow from '../../img/weapon/bow.svg';
import fusion from '../../img/weapon/fusion.svg';
import glaive from '../../img/weapon/glaive.svg';
import grenadeLauncher from '../../img/weapon/grenade_launcher.svg';
import handCannon from '../../img/weapon/hand_cannon.svg';
import linearFusion from '../../img/weapon/linear_fusion.svg';
import machinegun from '../../img/weapon/machinegun.svg';
import pulse from '../../img/weapon/pulse.svg';
import rocketLauncher from '../../img/weapon/rocket_launcher.svg';
import scout from '../../img/weapon/scout.svg';
import shotgun from '../../img/weapon/shotgun.svg';
import sidearm from '../../img/weapon/sidearm.svg';
import sniper from '../../img/weapon/sniper.svg';
import submachineGun from '../../img/weapon/submachine_gun.svg';
import sword from '../../img/weapon/sword.svg';
import trace from '../../img/weapon/trace.svg';

export const WEAPON_DAMAGE_TYPE = {
  KINETIC: 1,
  ARC: 2,
  SOLAR: 3,
  VOID: 4,
  STASIS: 6,
  STRAND: 7,
};

export const WEAPON_DAMAGE_TYPE_NAME = {
  1: 'Kinetic',
  2: 'Arc',
  3: 'Solar',
  4: 'Void',
  6: 'Stasis',
  7: 'Strand',
};

export const WEAPON_DAMAGE_TYPE_IMAGE = {
  1: kinetic,
  2: arc,
  3: solar,
  4: voidD,
  6: stasis,
  7: strand,
};

export const WEAPON_DAMAGE_TYPE_IMAGE_TRANSPARENT = {
  1: kineticTransparent,
  2: arcTransparent,
  3: solarTransparent,
  4: voidTransparent,
  6: stasisTransparent,
  7: strandTransparent,
};

export const WEAPON_RARITY = {
  BASIC: 2,
  COMMON: 3,
  RARE: 4,
  LEGENDARY: 5,
  EXOTIC: 6,
};

export const WEAPON_RARITY_NAME = {
  2: 'Basic',
  3: 'Common',
  4: 'Rare',
  5: 'Legendary',
  6: 'Exotic',
};

export const WEAPON_RARITY_IMAGE = {
  2: basic,
  3: common,
  4: rare,
  5: legendary,
  6: exotic,
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

export const WEAPON_TYPE_IMAGE = {
  6: auto,
  7: shotgun,
  8: machinegun,
  9: handCannon,
  10: rocketLauncher,
  11: fusion,
  12: sniper,
  13: pulse,
  14: scout,
  17: sidearm,
  18: sword,
  22: linearFusion,
  23: grenadeLauncher,
  24: submachineGun,
  25: trace,
  31: bow,
  33: glaive,
};
