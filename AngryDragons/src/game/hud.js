import { format } from "../core/utils.js";
import { energyKinetic, momentum } from "./physics.js";

export function setHUD({ mass, v0, angleDeg, p0, Ec0, power, castleHP, dragonAlive }) {
  const stats = document.getElementById("statsLine");
  stats.textContent =
    `m: ${mass} kg | v₀: ${format(v0,1)} m/s* | θ: ${format(angleDeg,0)}° | Potencia: ${format(power,0)} | Castillo HP: ${castleHP} | Dragones: ${dragonAlive}`;

  const formula = document.getElementById("formulaLine");
  formula.textContent =
    `p = m·v = ${mass}·${format(v0,1)} = ${format(p0,1)} kg·m/s | Ec = ½·m·v² = ½·${mass}·${format(v0,1)}² = ${format(Ec0,0)} J`;

  // *Nota: en canvas usamos px/s, aquí lo mostramos como "m/s" educativo simplificado.
  // Si luego quieres “real”, calibramos px->m con una escala.
}

export function setImpactLine({ mass, vImpact, dmg, target }) {
  const formula = document.getElementById("formulaLine");
  const Ec = energyKinetic(mass, vImpact);
  const p = momentum(mass, vImpact);
  formula.textContent =
    `Impacto en ${target}: v = ${format(vImpact,1)} | p = ${format(p,1)} | Ec = ${format(Ec,0)} J | Daño = ${dmg}`;
}
