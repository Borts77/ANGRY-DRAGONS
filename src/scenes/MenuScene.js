import { toast } from "../core/utils.js";

export class MenuScene {
  constructor(app) { 
    this.app = app; 
    this.physicsVisible = false;
  }

  enter() { 
    toast("BIENVENIDO A ANGRY DRAGONS"); 
    this.physicsVisible = false;
  }

  update(dt) {
    const { input } = this.app;

    // Si el panel de física está abierto, cualquier clic lo cierra
    if (this.physicsVisible) {
      if (input.mouse.justDown || input.isKey("escape") || input.isKey("f")) {
        this.togglePhysics(false);
      }
      return; // Bloqueamos el resto de acciones mientras el panel está abierto
    }

    // Lógica de navegación
    if (input.isKey("1")) {
      this.app.setScene("levelselect");
    }
    
    if (input.isKey("e")) {
      this.app.setScene("editor");
    }

    if (input.isKey("f")) {
      this.togglePhysics(true);
    }

    // Detección de clics en botones visuales
    if (input.mouse.justDown) {
      const mx = input.mouse.x;
      const my = input.mouse.y;

      // Botón JUGAR (Centro)
      if (mx > 540 && mx < 740 && my > 300 && my < 360) {
        this.app.setScene("levelselect");
      }
      // Botón EDITOR (Abajo del de jugar)
      if (mx > 540 && mx < 740 && my > 380 && my < 430) {
        this.app.setScene("editor");
      }
      // Botón FÍSICA
      if (mx > 540 && mx < 740 && my > 450 && my < 500) {
        this.togglePhysics(true);
      }
    }
  }

  togglePhysics(show) {
    this.physicsVisible = show;
    let panel = document.getElementById("physicsPanel");
    
    if (show) {
      if (!panel) {
        panel = document.createElement("div");
        panel.id = "physicsPanel";
        panel.className = "physics-panel";
        document.body.appendChild(panel);
      }
      
      panel.innerHTML = `
        <button class="close-btn" style="float:right; cursor:pointer;">X</button>
        <h2 style="color:#ffcc00; margin-top:0;">📚 Física del Proyectil</h2>
        <p>Este juego utiliza ecuaciones reales de cinemática:</p>
        <div style="background:#222; padding:15px; border-radius:8px; font-family:serif; font-size:1.1em; border:1px solid #444;">
            <strong>Posición Horizontal:</strong><br>
            $x = x_0 + v_0 \cdot \cos(\theta) \cdot t$<br><br>
            <strong>Posición Vertical (con Gravedad):</strong><br>
            $y = y_0 + v_0 \cdot \sin(\theta) \cdot t - \frac{1}{2}g \cdot t^2$
        </div>
        <p><strong>Impacto:</strong> El daño se calcula mediante la <i>Energía Cinética</i> ($E_k = \frac{1}{2}mv^2$). Por eso las piedras pesadas a gran velocidad son más destructivas.</p>
        <p style="text-align:center; color:#888; font-size:0.8em;">Presiona cualquier tecla para cerrar</p>
      `;
      panel.style.display = "block";
      
      // Botón de cerrar interno
      panel.querySelector(".close-btn").onclick = () => this.togglePhysics(false);
    } else if (panel) {
      panel.style.display = "none";
    }
  }

  draw(ctx) {
    const { assets } = this.app;
    const bg = assets.I("background");
    
    // Dibujar fondo
    if (bg) ctx.drawImage(bg, 0, 0, 1280, 720);

    // Overlay oscuro para el menú
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, 1280, 720);

    // Título
    ctx.fillStyle = "#ffcc00";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "gold";
    ctx.fillText("ANGRY DRAGONS", 640, 200);
    ctx.shadowBlur = 0;

    // --- BOTONES ---
    this.drawButton(ctx, 640, 330, "JUGAR [1]", "#ffcc00");
    this.drawButton(ctx, 640, 405, "EDITOR [E]", "#fff");
    this.drawButton(ctx, 640, 475, "VER FÍSICA [F]", "#00ffcc");

    // Hint inferior
    ctx.fillStyle = "rgba(0,0,0,.6)";
    ctx.fillRect(0, 720 - 44, 1280, 44);
    ctx.fillStyle = "#fff";
    ctx.font = "600 14px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Usa el Mouse o el Teclado para navegar • Powered by Physics Equations", 640, 720 - 16);
  }

  drawButton(ctx, x, y, text, color) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - 100, y - 30, 200, 50, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y + 5);
  }
}
