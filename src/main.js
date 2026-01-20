import { CANVAS_W, CANVAS_H } from "./core/constants.js";
import { Assets, ASSETS_DATA } from "./core/assets.js"; // Importamos la lista de datos
import { Input } from "./core/input.js";
import { AudioBus } from "./core/audio.js";

import { MenuScene } from "./scenes/MenuScene.js";
import { LevelSelectScene } from "./scenes/LevelSelectScene.js";
import { GameScene } from "./scenes/GameScene.js";
import { EditorScene } from "./scenes/EditorScene.js";

class App {
  constructor() {
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    this.assets = new Assets();
    this.input = new Input(this.canvas);
    this.audio = new AudioBus(this.assets);
    this.scenes = new Map();
    this.current = null;
    this.lastT = performance.now();
  }

  async boot() {
    // CARGA AUTOMÁTICA DE IMÁGENES
    // Ahora recorre la lista que definimos en assets.js
    for (const img of ASSETS_DATA.images) {
      await this.assets.loadImage(img.id, `./${img.src}`);
    }

    // CARGA AUTOMÁTICA DE AUDIOS
    // Cargamos la música principal primero
    await this.assets.loadAudio("Skyflingmusic", "./assets/Skyflingmusic.mp3", { loop: true, volume: 0.35 });
    
    // Cargamos el resto de efectos de sonido de la lista
    for (const sound of ASSETS_DATA.sounds) {
      // Evitamos cargar doble la música si ya está en la lista
      if (sound.id !== "Skyflingmusic") {
        await this.assets.loadAudio(sound.id, `./${sound.src}`, { volume: sound.volume || 0.6 });
      }
    }

    // Configuración de Escenas
    this.scenes.set("menu", new MenuScene(this));
    this.scenes.set("levelselect", new LevelSelectScene(this));
    this.scenes.set("game", new GameScene(this));
    this.scenes.set("editor", new EditorScene(this));

    this.audio.music("Skyflingmusic");

    this.setScene("menu");
    requestAnimationFrame(this.loop.bind(this));
  }

  setScene(name, params) {
    this.current = this.scenes.get(name);
    this.current?.enter?.(params);
    
    const hudTopLeft = document.getElementById("topLeft");
    const hudTopRight = document.getElementById("topRight");
    if (hudTopLeft && hudTopRight) {
      const isGame = (name === "game");
      hudTopLeft.style.display = isGame ? "block" : "none";
      hudTopRight.style.display = isGame ? "block" : "none";
    }
  }

  loop(t) {
    const dt = Math.min(0.033, (t - this.lastT) / 1000);
    this.lastT = t;
    this.current?.update?.(dt);
    this.ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    this.current?.draw?.(this.ctx);
    this.input.beginFrame();
    requestAnimationFrame(this.loop.bind(this));
  }
}

// Inicialización con el clic del usuario (necesario para el audio)
const app = new App();
const overlay = document.getElementById("startOverlay");
if (overlay) {
  overlay.addEventListener("click", async () => {
    try {
      await app.boot();
      app.input.clear();
      overlay.style.display = "none";
    } catch (err) {
      console.error("Error al iniciar el juego:", err);
    }
  }, { once: true });
}
