import {
  CANVAS_W, CANVAS_H, CATAPULT_POS, POWER_MAX, POWER_TO_SPEED,
  DRAGON_HIT_RADIUS, CASTLE_MAX_HP, DRAGON_ATTACK_DAMAGE
} from "../core/constants.js";
import { clamp, dist, toast } from "../core/utils.js";
import { stepProjectile, impactSpeed, damageFromImpact } from "../game/physics.js";
import { setHUD } from "../game/hud.js";
import { LEVELS } from "../game/levelData.js";

export class GameScene {
  constructor(app) {
    this.app = app;
    this.particles = []; 
    this.reset();
  }

  reset() {
    this.level = null;
    this.dragons = [];
    this.ammo = [];
    this.particles = [];
    this.selectedAmmoIdx = 0;
    this.castleHP = CASTLE_MAX_HP;
    this.aiming = false;
    this.power = 0;
    this.aimStart = { x: 0, y: 0 };
    this.projectile = { active: false, x: 0, y: 0, vx: 0, vy: 0, mass: 5, scale: 1 };
    this.screenShake = 0;
    this.gameOverTriggered = false;
    this.victoryTriggered = false;
  }

  enter(params) {
    this.reset();
    const levelId = params?.levelId ?? 1;
    this.level = LEVELS.find(l => l.id === levelId) ?? LEVELS[0];
    
    this.castleHP = this.level.castleHP;
    this.ammo = this.level.ammo.map(a => ({ ...a }));
    this.dragons = this.level.dragons.map(d => ({
      ...d,
      alive: true,
      falling: false,
      rotation: 0,
      attackTimer: 0,
      maxHP: d.hp,
      state: "atacar",
      timer: 0
    }));

    this.selectedAmmoIdx = 0;
    this.resetProjectile();
    toast(`${this.level.name} • Defend the Castle!`);
  }

  resetProjectile() {
    this.projectile.active = false;
    this.projectile.x = CATAPULT_POS.x - 25;
    this.projectile.y = CATAPULT_POS.y + 15;
    const current = this.ammo[this.selectedAmmoIdx];
    this.projectile.mass = current.mass;
    this.projectile.scale = current.scale;
    this.power = 0;
  }

  createParticles(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 300,
        vy: (Math.random() - 0.5) * 300,
        life: 1.0,
        color: color,
        size: Math.random() * 5 + 2
      });
    }
  }

  update(dt) {
    const { input, audio } = this.app;

    // --- CORRECCIÓN DE BLOQUEO: Detectar teclas SIEMPRE ---
    if (input.isKey("escape")) {
        this.app.setScene("menu");
        return;
    }
    if (input.isKey("r")) {
        this.enter({ levelId: this.level.id });
        return;
    }

    // Si ya terminó el juego, paramos aquí para no mover dragones ni físicas
    if (this.gameOverTriggered || this.victoryTriggered) return;

    // Actualizar partículas
    this.particles.forEach(p => {
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy += 400 * dt; p.life -= dt * 2;
    });
    this.particles = this.particles.filter(p => p.life > 0);

    // Selección de munición
    if (!this.projectile.active && input.mouse.justDown) {
      const mx = input.mouse.x; const my = input.mouse.y;
      this.ammo.forEach((a, i) => {
        const y = 250 + i * 85; 
        if (mx > 20 && mx < 90 && my > y && my < y + 70) {
          this.selectedAmmoIdx = i;
          this.resetProjectile();
          audio.play("levelup");
        }
      });
    }

    // Lógica de apuntado y disparo
    if (!this.projectile.active) {
      if (input.mouse.justDown && dist(input.mouse.x, input.mouse.y, this.projectile.x, this.projectile.y) < 100) {
        this.aiming = true;
        this.aimStart = { x: this.projectile.x, y: this.projectile.y };
      }
      if (this.aiming && input.mouse.down) {
        const prevPower = this.power;
        this.power = clamp((dist(this.aimStart.x, this.aimStart.y, input.mouse.x, input.mouse.y) / 200) * POWER_MAX, 0, POWER_MAX);
        if (Math.floor(this.power / 15) > Math.floor(prevPower / 15)) audio.play("tension_madera");
      }
      if (this.aiming && input.mouse.justUp) {
        this.aiming = false;
        const currentAmmo = this.ammo[this.selectedAmmoIdx];
        if (currentAmmo.count > 0 && this.power > 10) {
          const dx = this.aimStart.x - input.mouse.x;
          const dy = this.aimStart.y - input.mouse.y;
          let angle = clamp(Math.atan2(dy, dx), -85 * Math.PI / 180, -10 * Math.PI / 180);
          currentAmmo.count--;
          this.projectile.active = true;
          const v0 = this.power * POWER_TO_SPEED;
          this.projectile.vx = Math.cos(angle) * v0 * 100;
          this.projectile.vy = Math.sin(angle) * v0 * 100;
          audio.play("launch");
        } else { this.resetProjectile(); }
      }
    }

    // Proyectil en vuelo
    if (this.projectile.active) {
      stepProjectile(this.projectile, dt);
      if (this.projectile.y >= this.level.groundY || this.projectile.x > CANVAS_W + 100) {
        this.createParticles(this.projectile.x, this.level.groundY, "#888", 8);
        audio.play("dropping-rocks");
        this.resetProjectile();
      }
    }

    this.updateDragons(dt);
    this.checkHits();
    this.updateHUD();
    if (this.screenShake > 0) this.screenShake -= dt * 40;

    // Condición de Victoria
    const aliveDragons = this.dragons.filter(d => d.alive).length;
    if (aliveDragons === 0 && !this.victoryTriggered) {
      this.victoryTriggered = true;
      audio.play("levelup");
      toast("VICTORY! Level Cleared!");
      setTimeout(() => {
        const nextLevel = LEVELS.find(l => l.id === this.level.id + 1);
        if (nextLevel) this.enter({ levelId: nextLevel.id });
        else this.app.setScene("menu");
      }, 3500);
    }

    // Condición de Derrota
    if (this.castleHP <= 0 && !this.gameOverTriggered) {
      this.castleHP = 0;
      this.gameOverTriggered = true;
      audio.play("game_over");
      toast("GAME OVER - The Castle has fallen!");
    }
  }

  updateDragons(dt) {
    for (const d of this.dragons) {
      if (!d.alive) {
        if (d.falling) {
          d.y += 500 * dt; d.rotation += 5 * dt;
          if (d.y > this.level.groundY + 100) d.falling = false;
        }
        continue;
      }

      const stopX = d.isBoss ? 450 : 350;
      const targetY = this.level.groundY - (d.isBoss ? 250 : 150);
      const time = Date.now() * 0.002;

      // COMPORTAMIENTO POR TIPO
      if (d.type === "verde") {
        if (d.x > stopX) {
          d.x -= d.speed * dt;
          d.y += (targetY - d.y) * 0.5 * dt;
        } else {
          d.x = stopX + Math.cos(time * 2) * 60;
          d.y = targetY + Math.sin(time * 2) * 60;
          this.executeAttack(d, dt);
        }
      } 
      else if (d.type === "negro") {
        d.timer += dt;
        if (d.timer > 2.5) { 
          this.createParticles(d.x, d.y, "#440066", 10);
          if (d.state === "atacar") {
            d.state = "huir";
            d.x += 250; 
          } else {
            d.state = "atacar";
            d.x = stopX + (Math.random() * 100);
          }
          this.createParticles(d.x, d.y, "#440066", 10);
          d.timer = 0;
        }
        // Solo ataca si está en estado atacar Y cerca del castillo
        if (d.state === "atacar" && d.x < 600) {
            this.executeAttack(d, dt);
        }
      } 
      else { // ROJO / NORMAL
        if (d.x > stopX) {
          d.x -= d.speed * dt;
          d.y += (targetY - d.y) * 0.5 * dt + Math.sin(time) * 2;
        } else {
          this.executeAttack(d, dt);
        }
      }
    }
  }

  executeAttack(d, dt) {
    d.attackTimer += dt;
    if (d.attackTimer >= 1.5) {
      this.castleHP -= d.isBoss ? DRAGON_ATTACK_DAMAGE * 2 : DRAGON_ATTACK_DAMAGE;
      d.attackTimer = 0;
      this.screenShake = d.isBoss ? 20 : 12;
      this.app.audio.play("leveldown");
    }
  }

  checkHits() {
    if (!this.projectile.active) return;
    for (const d of this.dragons) {
      if (!d.alive) continue;
      const hitR = DRAGON_HIT_RADIUS * (d.scale ?? 1);
      if (dist(this.projectile.x, this.projectile.y, d.x, d.y) < hitR) {
        const v = impactSpeed(this.projectile.vx/100, this.projectile.vy/100);
        d.hp -= damageFromImpact(this.projectile.mass, v);
        this.createParticles(this.projectile.x, this.projectile.y, "#ff4444", 15);
        this.app.audio.play("collision");
        this.app.audio.play("dragon_roar");
        if (d.hp <= 0) { d.alive = false; d.falling = true; }
        this.resetProjectile();
        break;
      }
    }
  }

  updateHUD() {
    const cur = this.ammo[this.selectedAmmoIdx];
    setHUD({
      mass: cur.mass,
      power: Math.floor(this.power),
      castleHP: Math.max(0, Math.ceil(this.castleHP)),
      dragonAlive: this.dragons.filter(d => d.alive).length
    });
  }

  draw(ctx) {
    const { assets } = this.app;
    ctx.save();
    if (this.screenShake > 0) ctx.translate((Math.random()-0.5)*this.screenShake, (Math.random()-0.5)*this.screenShake);

    ctx.drawImage(assets.I("background"), 0, 0, CANVAS_W, CANVAS_H);

    let cImg = assets.I("castle");
    if (this.castleHP < 40) cImg = assets.I("castle3");
    else if (this.castleHP < 75) cImg = assets.I("castle2");
    
    if (cImg) ctx.drawImage(cImg, 20, this.level.groundY - 170, 220, 200);

    const catImg = this.projectile.active ? assets.I("catapult2") : assets.I("catapult1");
    if (catImg) ctx.drawImage(catImg, CATAPULT_POS.x - 60, CATAPULT_POS.y - 120, 190, 190);

    if (this.aiming) this.drawTrajectory(ctx);

    this.particles.forEach(p => {
      ctx.fillStyle = p.color; ctx.globalAlpha = p.life;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;

    const size = (this.projectile.active ? 36 : 32) * this.projectile.scale;
    const pImg = assets.I("piedra");
    if (pImg) ctx.drawImage(pImg, this.projectile.x - size/2, this.projectile.y - size/2, size, size);

    const frame = (Math.floor(Date.now()/150) % 2 === 0) ? "1" : "2";
    for (const d of this.dragons) {
      if (!d.alive && !d.falling) continue;
      
      let imgKey = "dragon" + frame;
      if (d.type === "verde") imgKey = "dragon_verde" + frame;
      if (d.type === "negro") imgKey = "dragon_negro" + frame;

      const img = assets.I(imgKey);
      if (!img) continue;

      const s = d.scale ?? 1;
      ctx.save();
      ctx.translate(d.x, d.y);
      if (d.falling) ctx.rotate(d.rotation);
      ctx.drawImage(img, -55*s, -55*s, 110*s, 110*s);
      ctx.restore();
      
      if (d.alive) {
        const barW = d.isBoss ? 120 : 60;
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(d.x - barW/2, d.y - (d.isBoss ? 100 : 65), barW, 5);
        ctx.fillStyle = d.isBoss ? "#ffcc00" : "#ff4444";
        ctx.fillRect(d.x - barW/2, d.y - (d.isBoss ? 100 : 65), (d.hp / d.maxHP) * barW, 5);
      }
    }

    ctx.restore();
    this.drawInventory(ctx);
    if (this.victoryTriggered) this.drawEndScreen(ctx, "VICTORY!", "The dragons flee! Castle saved.");
    if (this.gameOverTriggered) this.drawEndScreen(ctx, "GAME OVER", "Press [R] to Retry");
  }

  drawInventory(ctx) {
    this.ammo.forEach((a, i) => {
      const y = 250 + i * 85; 
      const sel = (i === this.selectedAmmoIdx);
      ctx.fillStyle = sel ? "rgba(255,204,0,0.4)" : "rgba(255,255,255,0.15)";
      ctx.beginPath(); ctx.roundRect(20, y, 70, 70, 12); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 11px Arial"; ctx.textAlign = "center";
      ctx.fillText(a.id.toUpperCase(), 55, y + 20);
      ctx.font = "bold 24px Arial"; ctx.fillText(`x${a.count}`, 55, y + 55);
    });
  }

  drawEndScreen(ctx, title, sub) {
    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = title === "VICTORY!" ? "#ffcc00" : "#ff4444";
    ctx.font = "bold 90px Arial"; ctx.textAlign = "center";
    ctx.fillText(title, CANVAS_W/2, CANVAS_H/2 - 20);
    ctx.fillStyle = "white"; ctx.font = "24px Arial";
    ctx.fillText(sub, CANVAS_W/2, CANVAS_H/2 + 40);
  }

  drawTrajectory(ctx) {
    const dx = this.aimStart.x - this.app.input.mouse.x;
    const dy = this.aimStart.y - this.app.input.mouse.y;
    let angle = clamp(Math.atan2(dy, dx), -85 * Math.PI / 180, -10 * Math.PI / 180);
    const v0 = this.power * POWER_TO_SPEED;
    let x = this.projectile.x, y = this.projectile.y;
    let vx = Math.cos(angle) * v0 * 100, vy = Math.sin(angle) * v0 * 100;
    ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.setLineDash([10, 15]); ctx.beginPath(); ctx.moveTo(x, y);
    for (let i = 0; i < 25; i++) {
      vy += 1400 * 0.06; x += vx * 0.06; y += vy * 0.06;
      ctx.lineTo(x, y); if (y > this.level.groundY) break;
    }
    ctx.stroke(); ctx.setLineDash([]);
  }
}

