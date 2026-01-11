export class AudioBus {
  constructor(assets) {
    this.assets = assets;
    this.muted = false;

    const btn = document.getElementById("btnMute");
    btn.addEventListener("click", () => {
      this.muted = !this.muted;
      btn.textContent = this.muted ? "🔇" : "🔊";
      this.applyMute();
    });
  }

  applyMute() {
    for (const a of this.assets.audio.values()) {
      a.muted = this.muted;
    }
  }

  play(key) {
    const a = this.assets.A(key);
    if (!a) return;
    a.currentTime = 0;
    a.play().catch(()=>{});
  }

  music(key) {
    const a = this.assets.A(key);
    if (!a) return;
    a.play().catch(()=>{});
  }

  stop(key) {
    const a = this.assets.A(key);
    if (!a) return;
    a.pause();
    a.currentTime = 0;
  }
}
