import { GROUND_Y, CASTLE_MAX_HP } from "../core/constants.js";

export const LEVELS = [
  // FASE 1: DRAGONES ROJOS (Simples)
  { id: 1, name: "The First Siege", castleHP: CASTLE_MAX_HP, groundY: GROUND_Y, ammo: [{ id: "Small", mass: 2, scale: 0.7, count: 10 }], dragons: [{ x: 1000, y: 300, hp: 20, speed: 30, type: "rojo", scale: 0.8 }] },
  { id: 2, name: "Double Trouble", castleHP: CASTLE_MAX_HP, groundY: GROUND_Y, ammo: [{ id: "Small", mass: 2, scale: 0.7, count: 12 }], dragons: [{ x: 1000, y: 250, hp: 25, speed: 35, type: "rojo", scale: 0.8 }, { x: 1200, y: 400, hp: 25, speed: 30, type: "rojo", scale: 0.8 }] },
  { id: 3, name: "The Red Horde", castleHP: CASTLE_MAX_HP, groundY: GROUND_Y, ammo: [{ id: "Medium", mass: 5, scale: 1.0, count: 10 }], dragons: [{ x: 1000, y: 200, hp: 30, speed: 40, type: "rojo", scale: 0.9 }, { x: 1200, y: 300, hp: 30, speed: 40, type: "rojo", scale: 0.9 }, { x: 1400, y: 450, hp: 30, speed: 40, type: "rojo", scale: 0.9 }] },

  // FASE 2: INTRODUCCIÓN AL VERDE (Giran)
  { id: 4, name: "Green Circles", castleHP: 120, groundY: GROUND_Y, ammo: [{ id: "Small", mass: 2, scale: 0.7, count: 15 }], dragons: [{ x: 1100, y: 300, hp: 40, speed: 40, type: "verde", scale: 1.0 }] },
  { id: 5, name: "Mixed Flight", castleHP: 120, groundY: GROUND_Y, ammo: [{ id: "Medium", mass: 5, scale: 1.0, count: 12 }], dragons: [{ x: 1000, y: 250, hp: 30, speed: 45, type: "rojo", scale: 0.9 }, { x: 1200, y: 400, hp: 45, speed: 35, type: "verde", scale: 1.0 }] },
  { id: 6, name: "Aerial Ballet", castleHP: 120, groundY: GROUND_Y, ammo: [{ id: "Medium", mass: 5, scale: 1.0, count: 15 }], dragons: [{ x: 1100, y: 200, hp: 50, speed: 40, type: "verde", scale: 1.0 }, { x: 1300, y: 450, hp: 50, speed: 40, type: "verde", scale: 1.0 }] },

  // FASE 3: TODOS LOS TIPOS (Incluye Negro)
  { id: 7, name: "The Shadow Appears", castleHP: 150, groundY: GROUND_Y, ammo: [{ id: "Large", mass: 12, scale: 1.4, count: 8 }], dragons: [{ x: 1200, y: 300, hp: 80, speed: 50, type: "negro", scale: 1.1 }] },
  { id: 8, name: "Elemental Chaos", castleHP: 150, groundY: GROUND_Y, ammo: [{ id: "Medium", mass: 5, scale: 1.0, count: 15 }, { id: "Large", mass: 12, scale: 1.4, count: 5 }], dragons: [{ x: 1000, y: 200, hp: 40, speed: 50, type: "rojo", scale: 0.9 }, { x: 1200, y: 400, hp: 60, speed: 40, type: "verde", scale: 1.0 }, { x: 1400, y: 300, hp: 90, speed: 45, type: "negro", scale: 1.1 }] },
  { id: 9, name: "Sky on Fire", castleHP: 180, groundY: GROUND_Y, ammo: [{ id: "Large", mass: 12, scale: 1.4, count: 15 }], dragons: [{ x: 1000, y: 250, hp: 100, speed: 40, type: "negro", scale: 1.2 }, { x: 1200, y: 450, hp: 70, speed: 50, type: "verde", scale: 1.1 }, { x: 1400, y: 150, hp: 70, speed: 50, type: "verde", scale: 1.1 }] },

  // NIVEL 10: EL GRAN FINAL
  { id: 10, name: "THE TRINITY BOSSES", castleHP: 250, groundY: GROUND_Y, ammo: [{ id: "Large", mass: 15, scale: 1.6, count: 25 }], dragons: [
    { x: 1200, y: 200, hp: 400, speed: 60, type: "rojo", scale: 2.2, isBoss: true },
    { x: 1400, y: 400, hp: 400, speed: 50, type: "verde", scale: 2.2, isBoss: true },
    { x: 1600, y: 300, hp: 400, speed: 70, type: "negro", scale: 2.2, isBoss: true }
  ]}
];
