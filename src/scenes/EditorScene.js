import { toast } from "../core/utils.js";

export class EditorScene {
  constructor(app) { this.app = app; }
  enter() { toast("Editor: próximamente (ya está el módulo listo) • ESC para volver"); }

  update(dt) {
    const { input } = this.app;
    if (input.isKey("escape")) this.app.setScene("menu");
  }

  draw(ctx) {
    const { assets } = this.app;
    ctx.drawImage(assets.I("background"), 0, 0, 1280, 720);

    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(0, 0, 1280, 720);

    ctx.fillStyle = "#fff";
    ctx.font = "800 42px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Editor de niveles", 640, 220);

    ctx.font = "500 18px system-ui";
    ctx.fillText("Aquí haremos: colocar dragones, ajustar HP, rutas, límites de piedras.", 640, 280);
    ctx.fillText("ESC = volver", 640, 330);
  }
}
