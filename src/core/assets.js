// 1. LISTA DE ARCHIVOS (Aquí es donde agregamos las imágenes nuevas)
export const ASSETS_DATA = {
  images: [
    { id: "background", src: "assets/background.png" },
    { id: "castle", src: "assets/castle.png" },
    { id: "castle2", src: "assets/castle2.png" },
    { id: "castle3", src: "assets/castle3.png" },
    { id: "catapult1", src: "assets/catapult1.png" },
    { id: "catapult2", src: "assets/catapult2.png" },
    { id: "piedra", src: "assets/piedra.png" },
    // Dragones Rojos (Normales)
    { id: "dragon1", src: "assets/dragon1.png" },
    { id: "dragon2", src: "assets/dragon2.png" },
    // Dragones Verdes
    { id: "dragon_verde1", src: "assets/dragon_verde1.png" },
    { id: "dragon_verde2", src: "assets/dragon_verde2.png" },
    // Dragones Negros
    { id: "dragon_negro1", src: "assets/dragon_negro1.png" },
    { id: "dragon_negro2", src: "assets/dragon_negro2.png" }
  ],
  sounds: [
    { id: "launch", src: "assets/launch.mp3" },
    { id: "collision", src: "assets/collision.mp3" },
    { id: "dragon_roar", src: "assets/dragon_roar.mp3" },
    { id: "leveldown", src: "assets/leveldown.mp3" },
    { id: "levelup", src: "assets/levelup.mp3" },
    { id: "game_over", src: "assets/game_over.mp3" },
    { id: "tension_madera", src: "assets/tension_madera.mp3" },
    { id: "dropping-rocks", src: "assets/dropping-rocks.mp3" }
  ]
};

// 2. LA CLASE ASSETS (Tu código original con una pequeña mejora de seguridad)
export class Assets {
  constructor() {
    this.img = new Map();
    this.audio = new Map();
  }

  async loadImage(key, url) {
    try {
      const im = new Image();
      im.src = url;
      await im.decode();
      this.img.set(key, im);
      return im;
    } catch (e) {
      console.error(`Error cargando imagen: ${url}`, e);
    }
  }

  async loadAudio(key, url, { loop = false, volume = 1 } = {}) {
    const a = new Audio(url);
    a.loop = loop;
    a.volume = volume;
    this.audio.set(key, a);
    return a;
  }

  // Retorna la imagen o null si no existe
  I(key) { 
    return this.img.get(key) || null; 
  }

  A(key) { 
    return this.audio.get(key); 
  }
}

