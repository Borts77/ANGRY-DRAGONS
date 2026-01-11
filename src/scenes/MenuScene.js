import { toast } from "../core/utils.js";

export class MenuScene {
  constructor(app) { this.app = app; }

  enter() { toast("Click para empezar • [1] Jugar • [E] Editor"); }

  update(dt) {
    const { input } = this.app;

    if (input.mouse.justDown || input.isKey("1")) {
      this.app.setScene("levelselect");
    }
    if (input.isKey("e")) {
      this.app.setScene("editor");
    }
  }

  draw(ctx) {
    const { assets } = this.app;
    const bg = assets.I("background");
    ctx.drawImage(bg, 0, 0, 1280, 720);

    // hint overlay abajo (no estorba el HUD)
ctx.fillStyle = "rgba(0,0,0,.28)";
ctx.fillRect(0, 720 - 44, 1280, 44);

ctx.fillStyle = "#fff";
ctx.font = "600 14px system-ui";
ctx.textAlign = "left";
ctx.fillText("Arrastra desde la catapulta para disparar • [1][2][3] masa • R reiniciar • ESC menú", 14, 720 - 16);



    ctx.font = "500 14px system-ui";
    ctx.fillText("Tip: Arrastra desde la catapulta para apuntar y soltar.", 640, 390);
  }
}
