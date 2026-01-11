export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouse = { x: 0, y: 0, down: false, justDown: false, justUp: false };
    this.keys = new Set();
    this._bind();
  }

  _bind() {
    const rectPos = (e) => {
      const r = this.canvas.getBoundingClientRect();
      this.mouse.x = (e.clientX - r.left) * (this.canvas.width / r.width);
      this.mouse.y = (e.clientY - r.top) * (this.canvas.height / r.height);
    };

    this.canvas.addEventListener("mousemove", (e) => rectPos(e));
    window.addEventListener("mousemove", (e) => rectPos(e));
    this.canvas.addEventListener("mousedown", (e) => {
      rectPos(e);
      this.mouse.down = true;
      this.mouse.justDown = true;
    });
    window.addEventListener("mouseup", (e) => {
      rectPos(e);
      this.mouse.down = false;
      this.mouse.justUp = true;
    });

    window.addEventListener("keydown", (e) => this.keys.add(e.key.toLowerCase()));
    window.addEventListener("keyup", (e) => this.keys.delete(e.key.toLowerCase()));
  }

  isKey(k) { return this.keys.has(k.toLowerCase()); }

  // Limpia estados para evitar clics fantasma al cambiar de escenas
  clear() {
    this.mouse.justDown = false;
    this.mouse.justUp = false;
    this.mouse.down = false;
    this.keys.clear();
  }

  beginFrame() {
    this.mouse.justDown = false;
    this.mouse.justUp = false;
  }
}