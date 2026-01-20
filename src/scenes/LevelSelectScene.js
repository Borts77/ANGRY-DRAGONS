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
      // Ajustamos la Y para que coincida con el nuevo dibujo (i * 55)
      const y = 200 + (i * 55); 
      
      // 1. Detección por Teclado (Soporta 0 para nivel 10)
      let keyToPress = lvl.id.toString();
      if (lvl.id === 10) keyToPress = "0"; // Usar '0' para el nivel 10

      if (input.isKey(keyToPress)) {
        this.app.setScene("game", { levelId: lvl.id });
      }

      // 2. Detección por Clic (Mouse)
      if (input.mouse.justDown) {
        const boxX = CANVAS_W / 2 - 300;
        const boxY = y - 35;
        const boxW = 600;
        const boxH = 45;

        if (
          input.mouse.x >= boxX && input.mouse.x <= boxX + boxW &&
          input.mouse.y >= boxY && input.mouse.y <= boxY + boxH
        ) {
          this.app.audio.play("levelup");
          this.app.setScene("game", { levelId: lvl.id });
        }
      }
    });
  }

  draw(ctx) {
    const { assets } = this.app;
    ctx.drawImage(assets.I("background"), 0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    ctx.fillStyle = "#ffcc00";
    ctx.font = "bold 50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("LEVEL SELECT", CANVAS_W / 2, 100); // Subimos el título

    LEVELS.forEach((lvl, i) => {
      // Reducimos el espacio entre cajas de 80 a 55
      const y = 200 + (i * 55);
      
      // Caja más ancha y delgada para que no se amontonen
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.strokeStyle = "rgba(255, 204, 0, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(CANVAS_W/2 - 300, y - 35, 600, 45, 8);
      ctx.fill();
      ctx.stroke();

      // Nombre del nivel (Alineado a la izquierda dentro de la caja)
      ctx.fillStyle = "white";
      ctx.font = "bold 22px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`${lvl.id}. ${lvl.name}`, CANVAS_W/2 - 280, y - 5);
      
      // Indicador de tecla (Alineado a la derecha)
      // Si es el nivel 10, le decimos que presione 0
      const keyHint = lvl.id === 10 ? "0" : lvl.id;
      ctx.fillStyle = "#ffcc00";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "right";
      ctx.fillText(`Press [${keyHint}]`, CANVAS_W/2 + 280, y - 5);
    });

    ctx.textAlign = "center";
    ctx.fillStyle = "#888";
    ctx.font = "18px Arial";
    ctx.fillText("ESC to go back", CANVAS_W/2, CANVAS_H - 30);
  }
}
