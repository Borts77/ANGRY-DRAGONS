export class Assets {
  constructor() {
    this.img = new Map();
    this.audio = new Map();
  }

  async loadImage(key, url) {
    const im = new Image();
    im.src = url;
    await im.decode();
    this.img.set(key, im);
    return im;
  }

  async loadAudio(key, url, { loop=false, volume=1 } = {}) {
    const a = new Audio(url);
    a.loop = loop;
    a.volume = volume;
    // no await needed (autoplay rules); just store
    this.audio.set(key, a);
    return a;
  }

  I(key) { return this.img.get(key); }
  A(key) { return this.audio.get(key); }
}
