import { CANVAS_W, CANVAS_H } from "./core/constants.js";
import { Assets } from "./core/assets.js";
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
    // IMÁGENES
    await this.assets.loadImage("background", "./assets/background.png");
    await this.assets.loadImage("castle", "./assets/castle.png");
    await this.assets.loadImage("catapult1", "./assets/catapult1.png");
    await this.assets.loadImage("catapult2", "./assets/catapult2.png");
    await this.assets.loadImage("piedra", "./assets/piedra.png");
    await this.assets.loadImage("dragon1", "./assets/dragon1.png");
    await this.assets.loadImage("dragon2", "./assets/dragon2.png");

    // AUDIOS - Verifica que los archivos existan con estos nombres
    await this.assets.loadAudio("Skyflingmusic", "./assets/Skyflingmusic.mp3", { loop: true, volume: 0.35 });
    await this.assets.loadAudio("launch", "./assets/launch.mp3", { volume: 0.8 });
    await this.assets.loadAudio("collision", "./assets/collision.mp3", { volume: 0.7 });
    await this.assets.loadAudio("dragon_roar", "./assets/dragon_roar.mp3", { volume: 0.6 });
    await this.assets.loadAudio("tension_madera", "./assets/tension_madera.mp3", { volume: 0.4 });
    await this.assets.loadAudio("dropping-rocks", "./assets/dropping-rocks.mp3", { volume: 0.5 });
    await this.assets.loadAudio("levelup", "./assets/levelup.mp3", { volume: 0.5 });
    await this.assets.loadAudio("leveldown", "./assets/leveldown.mp3", { volume: 0.6 });
    await this.assets.loadAudio("next_level", "./assets/level_up.mp3", { volume: 0.7 });
    await this.assets.loadAudio("game_over", "./assets/game_over.mp3", { volume: 0.8 });

    this.scenes.set("menu", new MenuScene(this));
    this.scenes.set("levelselect", new LevelSelectScene(this));
    this.scenes.set("game", new GameScene(this));
    this.scenes.set("editor", new EditorScene(this));

this.audio.music("Skyflingmusic"); // La música arranca aquí y no se detiene

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
    this.input.beginFrame(); // Esto limpia justDown/Up cada frame
    requestAnimationFrame(this.loop.bind(this));
  }
}

// Inicialización segura con Overlay
const app = new App();
const overlay = document.getElementById("startOverlay");
if (overlay) {
  overlay.addEventListener("click", async () => {
    await app.boot();
    app.input.clear(); // ¡IMPORTANTE! Limpia el clic del overlay
    overlay.style.display = "none";
  }, { once: true });
}