import { GRAVITY, AIR_DRAG, DAMAGE_SCALE } from "../core/constants.js";

export function stepProjectile(p, dt) {
  // aire (opcional)
  if (AIR_DRAG > 0) {
    p.vx *= (1 - AIR_DRAG);
    p.vy *= (1 - AIR_DRAG);
  }
  p.vy += GRAVITY * dt;
  p.x += p.vx * dt;
  p.y += p.vy * dt;
}

export function impactSpeed(vx, vy) {
  return Math.hypot(vx, vy);
}

export function energyKinetic(m, v) {
  return 0.5 * m * v * v;
}

export function momentum(m, v) {
  return m * v;
}

export function damageFromImpact(m, v) {
  const Ec = energyKinetic(m, v);
  return Math.max(1, Math.round(Ec / DAMAGE_SCALE));
}
