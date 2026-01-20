import { GROUND_Y, CASTLE_MAX_HP } from "../core/constants.js";

export const LEVELS = [
  {
    id: 1,
    name: "Level 1 — The First Siege",
    castleHP: CASTLE_MAX_HP,
    groundY: GROUND_Y,
    ammo: [
      { id: "Small", mass: 2, scale: 0.7, count: 10 },
      { id: "Medium", mass: 5, scale: 1.0, count: 6 }
    ],
    dragons: [
      { x: 1000, y: 250, hp: 30, speed: 45, type: "rojo", scale: 0.9 },
      { x: 1200, y: 400, hp: 40, speed: 35, type: "rojo", scale: 1.1 },
      { x: 1400, y: 300, hp: 35, speed: 40, type: "verde", scale: 1.0 } // Uno verde para probar
    ]
  },
  {
    id: 2,
    name: "Level 2 — Magic & Speed",
    castleHP: 120,
    groundY: GROUND_Y,
    ammo: [
      { id: "Small", mass: 2, scale: 0.7, count: 15 },
      { id: "Medium", mass: 5, scale: 1.0, count: 10 },
      { id: "Large", mass: 12, scale: 1.4, count: 5 }
    ],
    dragons: [
      { x: 1100, y: 150, hp: 45, speed: 50, type: "verde", scale: 1.0 },
      { x: 1300, y: 450, hp: 45, speed: 55, type: "verde", scale: 1.0 },
      { x: 1500, y: 300, hp: 60, speed: 40, type: "negro", scale: 1.2 }, // El negro se teletransporta
      { x: 1700, y: 200, hp: 40, speed: 60, type: "rojo", scale: 0.9 }
    ]
  },
  {
    id: 3,
    name: "Level 3 — THE ELDER BOSS",
    castleHP: 150,
    groundY: GROUND_Y,
    ammo: [
      { id: "Medium", mass: 5, scale: 1.0, count: 20 },
      { id: "Large", mass: 15, scale: 1.6, count: 12 }
    ],
    dragons: [
      { 
        x: 1200, y: 300, 
        hp: 500, 
        speed: 70, 
        scale: 2.3, 
        type: "negro", // El jefe ahora es Negro (teletransporte)
        isBoss: true 
      }
    ]
  }
];
