import { LEVELS } from "../game/levelData.js";
import { toast } from "../core/utils.js";
import { CANVAS_W, CANVAS_H } from "../core/constants.js";

export class LevelSelectScene {
  constructor(app) { this.app = app; }

  enter() { 
    toast("Choose your Battle! Click or Press Number"); 
  }

  update(dt) {
    const { input } = this.app;
    if (input.isKey("escape")) this.app.setScene("menu");

    LEVELS.forEach((lvl, i) => {
      // 1. Detección por Teclado
      if (input.isKey(lvl.id.toString())) {
        this.app.setScene("game", { levelId: lvl.id });
      }

      // 2. Detección por Clic (Mouse)
      if (input.mouse.justDown) {
        const y = 280 + (i * 80);
        // Definimos el área de la caja (misma que dibujamos en draw)
        const boxX = CANVAS_W / 2 - 250;
        const boxY = y - 45;
        const boxW = 500;
        const boxH = 60;

        if (
          input.mouse.x >= boxX && input.mouse.x <= boxX + boxW &&
          input.mouse.y >= boxY && input.mouse.y <= boxY + boxH
        ) {
          this.app.audio.play("levelup"); // Feedback sonoro al hacer clic
          this.app.setScene("game", { levelId: lvl.id });
        }
      }
    });
  }

  draw(ctx) {
    const { assets } = this.app;
    // Dibujamos el fondo oscuro para que resalte el menú
    ctx.drawImage(assets.I("background"), 0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    ctx.fillStyle = "#ffcc00";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.fillText("LEVEL SELECT", CANVAS_W / 2, 150);

    LEVELS.forEach((lvl, i) => {
      const y = 280 + (i * 80);
      
      // Dibujar la caja del nivel
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.strokeStyle = "#ffcc00";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(CANVAS_W/2 - 250, y - 45, 500, 60, 10);
      ctx.fill();
      ctx.stroke();

      // Texto del nivel
      ctx.fillStyle = "white";
      ctx.font = "bold 28px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`${lvl.id}. ${lvl.name}`, CANVAS_W/2 - 220, y - 5);
      
      // Indicador de tecla
      ctx.fillStyle = "#ffcc00";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "right";
      ctx.fillText(`Press [${lvl.id}]`, CANVAS_W/2 + 220, y - 5);
    });

    ctx.textAlign = "center";
    ctx.fillStyle = "#888";
    ctx.font = "20px Arial";
    ctx.fillText("ESC to go back", CANVAS_W/2, 650);
  }
}