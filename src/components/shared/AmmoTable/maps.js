import iconQuestionMark from '../../../assets/icons/question_mark.svg';
import iconTA from '../../../assets/icons/ammo/towed-artilery.svg';
import iconGMLRS from '../../../assets/icons/ammo/guided-mlrs.svg';
import iconHelicopter from '../../../assets/icons/ammo/helicopter.svg';
import iconAPC from '../../../assets/icons/ammo/armored-personnel-carrier.svg';
import iconVessel from '../../../assets/icons/ammo/vessel.svg';
import iconSPA from '../../../assets/icons/ammo/self-propelled-artillery.svg';
import iconMLRS from '../../../assets/icons/ammo/mlrs.svg';
import iconMRAP from '../../../assets/icons/ammo/mine-resistant-ambush-protected.svg';
import iconTank from '../../../assets/icons/ammo/tank.svg';
import iconAircraft from '../../../assets/icons/ammo/aircraft.svg';
import iconIFV from '../../../assets/icons/ammo/infantry-fighting-vehicle.svg';
import iconSPAAW from '../../../assets/icons/ammo/self-propelled-anti-aircraft-weapon.svg';

export const AmmoIconMap = {
  'Towed Artillery': iconTA,
  'Artillery rounds': iconQuestionMark, // TODO!
  'Guided MLRS': iconGMLRS,
  Helicopter: iconHelicopter,
  'Armored Personnel Carrier': iconAPC,
  other: iconQuestionMark, // TODO
  Vessel: iconVessel,
  'Surface-to-Air Missile System': iconQuestionMark, // TODO!
  'Self-Propelled Artillery': iconSPA,
  'Multiple Launch Rocket System': iconMLRS,
  'Mine-Resistant Ambush Protected': iconMRAP,
  Tank: iconTank,
  Aircraft: iconAircraft,
  'Infantry Fighting Vehicle': iconIFV,
  'Self-Propelled Anti-Aircraft Weapon': iconSPAAW,
};

export const AmmoLabelMap = {
  'Towed Artillery': 'Гаубицы',
  'Artillery rounds': '???',
  'Guided MLRS': 'GMLRS',
  Helicopter: 'Вертолёты',
  'Armored Personnel Carrier': 'БТР',
  other: '???',
  Vessel: 'Катера',
  'Surface-to-Air Missile System': '???',
  'Self-Propelled Artillery': 'САУ',
  'Multiple Launch Rocket System': 'РСЗО',
  'Mine-Resistant Ambush Protected': 'MRAP',
  Tank: 'Танки',
  Aircraft: 'Самолёты',
  'Infantry Fighting Vehicle': 'БМП',
  'Self-Propelled Anti-Aircraft Weapon': 'ПВО',
};
