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
    this.particles = []; // Contenedor de partículas
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
      falling: false, // Para animación de muerte
      rotation: 0,    // Para animación de muerte
      t: Math.random() * 10,
      attackTimer: 0,
      targetY: d.y,
      maxHP: d.hp 
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

  // Generador de partículas para impactos
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

    if (this.gameOverTriggered || this.victoryTriggered) return;

    if (input.isKey("escape")) this.app.setScene("menu");
    if (input.isKey("r")) this.enter({ levelId: this.level.id });

    // Actualizar Partículas
    this.particles.forEach(p => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 400 * dt; // Gravedad en partículas
      p.life -= dt * 2;
    });
    this.particles = this.particles.filter(p => p.life > 0);

    // Selector de Munición
    if (!this.projectile.active && input.mouse.justDown) {
      const mx = input.mouse.x;
      const my = input.mouse.y;
      const panelX = 20; 
      this.ammo.forEach((a, i) => {
        const y = 250 + i * 85; 
        if (mx > panelX && mx < panelX + 70 && my > y && my < y + 70) {
          this.selectedAmmoIdx = i;
          this.resetProjectile();
          audio.play("levelup");
        }
      });
    }

    // Apuntado y Disparo
    if (!this.projectile.active) {
      if (input.mouse.justDown) {
        if (dist(input.mouse.x, input.mouse.y, this.projectile.x, this.projectile.y) < 100) {
          this.aiming = true;
          this.aimStart = { x: this.projectile.x, y: this.projectile.y };
        }
      }

      if (this.aiming && input.mouse.down) {
        const prevPower = this.power;
        const d = dist(this.aimStart.x, this.aimStart.y, input.mouse.x, input.mouse.y);
        this.power = clamp((d / 200) * POWER_MAX, 0, POWER_MAX);
        if (Math.floor(this.power / 15) > Math.floor(prevPower / 15)) {
          audio.play("tension_madera");
        }
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
        } else {
          this.resetProjectile();
        }
      }
    }

    // Física del Proyectil
    if (this.projectile.active) {
      stepProjectile(this.projectile, dt);
      if (this.projectile.y >= this.level.groundY || this.projectile.x > CANVAS_W + 100) {
        this.createParticles(this.projectile.x, this.level.groundY, "#888", 8); // Polvo al chocar suelo
        audio.play("dropping-rocks");
        this.resetProjectile();
      }
    }

    this.updateDragons(dt);
    this.checkHits();
    this.updateHUD();

    if (this.screenShake > 0) this.screenShake -= dt * 40;

    // Lógica de Victoria Mejorada
    const aliveDragons = this.dragons.filter(d => d.alive).length;
    if (aliveDragons === 0 && !this.victoryTriggered) {
      this.victoryTriggered = true;
      this.app.audio.play("next_level"); 
      toast("VICTORY! Level Cleared!");
      
      setTimeout(() => {
        const nextId = this.level.id + 1;
        // Buscamos si el nivel existe en la lista de LEVELS
        const nextLevelExists = LEVELS.find(l => l.id === nextId);
        
        if (nextLevelExists) {
          // Si existe, entramos al siguiente nivel directamente
          this.enter({ levelId: nextId });
          this.victoryTriggered = false; // Reset para el nuevo nivel
        } else {
          // Si no hay más niveles, volvemos al menú
          this.app.setScene("menu");
        }
      }, 3500);
    }

    // Lógica de Derrota
    if (this.castleHP <= 0 && !this.gameOverTriggered) {
      this.castleHP = 0;
      this.gameOverTriggered = true;
      audio.play("game_over");
      toast("GAME OVER - The Castle has fallen!");
      setTimeout(() => this.app.setScene("menu"), 3000);
    }
  }

  updateDragons(dt) {
  for (const d of this.dragons) {
    if (!d.alive) {
      if (d.falling) {
        d.y += 500 * dt;
        d.rotation += 5 * dt;
        if (d.y > this.level.groundY + 100) d.falling = false;
      }
      continue;
    }

    // Punto donde el dragón se detiene para atacar el castillo
    const stopX = d.isBoss ? 450 : 300; 
    const attackTargetY = this.level.groundY - (d.isBoss ? 250 : 150);

    if (d.x > stopX) {
      // MOVIMIENTO HACIA EL CASTILLO
      d.x -= d.speed * dt;
      
      // Suavizamos el acercamiento a la altura de ataque
      d.y += (attackTargetY - d.y) * 0.5 * dt;

      // OSCILACIÓN (Dificultad)
      // Si es jefe, oscila arriba y abajo mientras vuela hacia ti
      if (d.isBoss) {
        d.y += Math.sin(Date.now() * 0.004) * 5; // Movimiento errático pero humano
      } else {
        d.y += Math.sin(Date.now() * 0.003) * 1.5;
      }
    } else {
      // ESTADO DE ATAQUE (Ya llegó al castillo)
      d.attackTimer += dt;
      
      // El jefe se queda flotando suavemente frente al castillo
      if (d.isBoss) {
        d.y = attackTargetY + Math.sin(Date.now() * 0.002) * 30;
      }

      if (d.attackTimer >= 1.5) { 
        this.castleHP -= d.isBoss ? DRAGON_ATTACK_DAMAGE * 2 : DRAGON_ATTACK_DAMAGE;
        d.attackTimer = 0;
        this.screenShake = d.isBoss ? 20 : 12;
        this.app.audio.play("leveldown");
      }
    }
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
        
        // Partículas de impacto
        this.createParticles(this.projectile.x, this.projectile.y, "#ff4444", 15 * (d.scale || 1));
        this.createParticles(this.projectile.x, this.projectile.y, "#ffcc00", 5);

        this.app.audio.play("collision"); 
        this.app.audio.play("dragon_roar"); 
        
        if (d.hp <= 0) {
  d.alive = false;
  d.falling = true;
  this.createParticles(d.x, d.y, "#ff0000", 40 * (d.scale || 1)); // ¡Explosión gigante para el jefe!
}
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
    if (this.screenShake > 0) {
      ctx.translate((Math.random()-0.5)*this.screenShake, (Math.random()-0.5)*this.screenShake);
    }

    ctx.drawImage(assets.I("background"), 0, 0, CANVAS_W, CANVAS_H);
    if (this.castleHP < 75) this.drawSmoke(ctx, 110, this.level.groundY - 180);
    if (this.castleHP < 40) this.drawSmoke(ctx, 160, this.level.groundY - 150);

    ctx.drawImage(assets.I("castle"), 20, this.level.groundY - 170, 220, 200);
    const catImg = this.projectile.active ? assets.I("catapult2") : assets.I("catapult1");
    ctx.drawImage(catImg, CATAPULT_POS.x - 60, CATAPULT_POS.y - 120, 190, 190);

    if (this.aiming) this.drawTrajectory(ctx);

    // Dibujar Partículas
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Dibujar Proyectil
    const sImg = assets.I("piedra");
    const sc = this.projectile.scale;
    const size = (this.projectile.active ? 36 : 32) * sc;
    ctx.drawImage(sImg, this.projectile.x - size/2, this.projectile.y - size/2, size, size);

    // Dibujar Dragones (incluyendo los que están cayendo)
    const dImg = (Math.floor(Date.now()/150) % 2 === 0) ? assets.I("dragon1") : assets.I("dragon2");
    for (const d of this.dragons) {
      if (!d.alive && !d.falling) continue;
      const s = d.scale ?? 1;
      
      ctx.save();
      ctx.translate(d.x, d.y);
      if (d.falling) ctx.rotate(d.rotation);
      ctx.drawImage(dImg, -55*s, -55*s, 110*s, 110*s);
      ctx.restore();
      
      if (d.alive) {
        // Barra de vida HP
        const barW = d.isBoss ? 120 : 60;
  const barH = d.isBoss ? 10 : 5;
  
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(d.x - barW/2, d.y - (d.isBoss ? 100 : 65), barW, barH);
  
  ctx.fillStyle = d.isBoss ? "#ffcc00" : "#ff4444"; // Barra dorada para el jefe
  ctx.fillRect(d.x - barW/2, d.y - (d.isBoss ? 100 : 65), (d.hp / d.maxHP) * barW, barH);
      }
    }

    ctx.restore();
    this.drawInventory(ctx);

    if (this.victoryTriggered) this.drawEndScreen(ctx, "VICTORY!", "The dragons flee! Castle saved.");
    if (this.gameOverTriggered) this.drawEndScreen(ctx, "GAME OVER", "The dragons destroyed the castle...");
  }

  drawInventory(ctx) {
    const panelX = 20; 
    this.ammo.forEach((a, i) => {
      const y = 250 + i * 85; 
      const isSelected = (i === this.selectedAmmoIdx);
      ctx.fillStyle = isSelected ? "rgba(255,204,0,0.4)" : "rgba(255,255,255,0.15)";
      ctx.strokeStyle = isSelected ? "#ffcc00" : "rgba(255,255,255,0.5)";
      ctx.lineWidth = isSelected ? 3 : 1; 
      ctx.beginPath();
      ctx.roundRect(panelX, y, 70, 70, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px Arial";
      ctx.textAlign = "center";
      ctx.fillText(a.id.toUpperCase(), panelX + 35, y + 20);
      ctx.font = "bold 24px Arial";
      ctx.fillText(`x${a.count}`, panelX + 35, y + 55);
    });
  }

  drawEndScreen(ctx, title, sub) {
  ctx.fillStyle = "rgba(0,0,0,0.85)";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  
  ctx.fillStyle = title === "VICTORY!" ? "#ffcc00" : "#ff4444";
  ctx.font = "bold 90px Arial";
  ctx.textAlign = "center";
  ctx.fillText(title, CANVAS_W/2, CANVAS_H/2 - 20);
  
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText(sub, CANVAS_W/2, CANVAS_H/2 + 40);
  
  // Mensaje de ayuda para reintentar o salir
  ctx.fillStyle = "#aaa";
  ctx.font = "20px Arial";
  ctx.fillText("Press [R] to Retry this level • [ESC] for Menu", CANVAS_W/2, CANVAS_H/2 + 100);
}

  drawSmoke(ctx, x, y) {
    const t = Date.now() * 0.0015;
    ctx.fillStyle = "rgba(100, 100, 100, 0.4)";
    for (let i = 0; i < 4; i++) {
        const ox = Math.sin(t + i) * 15;
        const oy = (t * 40 + i * 25) % 100;
        ctx.beginPath();
        ctx.arc(x + ox, y - oy, 25 - i * 4, 0, Math.PI * 2);
        ctx.fill();
    }
  }

  drawTrajectory(ctx) {
    const dx = this.aimStart.x - this.app.input.mouse.x;
    const dy = this.aimStart.y - this.app.input.mouse.y;
    let angle = clamp(Math.atan2(dy, dx), -85 * Math.PI / 180, -10 * Math.PI / 180);
    const v0 = this.power * POWER_TO_SPEED;
    let x = this.projectile.x, y = this.projectile.y;
    let vx = Math.cos(angle) * v0 * 100, vy = Math.sin(angle) * v0 * 100;
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 15]);
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let i = 0; i < 25; i++) {
      vy += 1400 * 0.06;
      x += vx * 0.06; y += vy * 0.06;
      ctx.lineTo(x, y);
      if (y > this.level.groundY) break;
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }
}