import { GROUND_Y, CASTLE_MAX_HP } from "../core/constants.js";

export const LEVELS = [
  {
    id: 1,
    name: "Level 1 — The First Siege",
    castleHP: CASTLE_MAX_HP,
    groundY: GROUND_Y,
    ammo: [
      { id: "Small", mass: 2, scale: 0.7, count: 8 },
      { id: "Medium", mass: 5, scale: 1.0, count: 5 }
    ],
    dragons: [
      { x: 1000, y: 200, hp: 30, speed: 40, scale: 0.8 },
      { x: 1150, y: 350, hp: 60, speed: 30, scale: 1.2 },
      { x: 1300, y: 500, hp: 40, speed: 45, scale: 1.0 }
    ]
  },
  {
    id: 2,
    name: "Level 2 — Dragon Swarm",
    castleHP: 120,
    groundY: GROUND_Y,
    ammo: [
      { id: "Small", mass: 2, scale: 0.7, count: 12 },
      { id: "Medium", mass: 5, scale: 1.0, count: 8 },
      { id: "Large", mass: 12, scale: 1.4, count: 4 }
    ],
    dragons: [
      { x: 1100, y: 150, hp: 40, speed: 45, scale: 0.9 },
      { x: 1200, y: 300, hp: 40, speed: 50, scale: 0.9 },
      { x: 1300, y: 450, hp: 40, speed: 55, scale: 0.9 },
      { x: 1450, y: 200, hp: 40, speed: 40, scale: 0.9 },
      { x: 1550, y: 400, hp: 40, speed: 48, scale: 0.9 }
    ]
  },
  // Reemplaza el Nivel 3 en tu levelData.js
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
    hp: 450, 
    speed: 70,    // Velocidad moderada para que lo veas venir
    scale: 2.5,   // Tamaño imponente
    isBoss: true
    }
  ]
}
];