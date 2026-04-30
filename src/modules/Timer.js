export class Timer {
  constructor(elementId, onTimeout = null) {
    this.element = document.getElementById(elementId);
    this.seconds = 0;
    this.intervalId = null;
    this.onTimeout = onTimeout;
  }

  start(duration) {
    this.stop();
    this.seconds = duration;
    this._updateDisplay();
    this.intervalId = setInterval(() => {
      this.seconds--;
      this._updateDisplay();
      if (this.seconds <= 0) {
        this.stop();
        if (this.onTimeout) this.onTimeout();
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getFormattedTime() {
    const m = Math.floor(this.seconds / 60);
    const s = this.seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  _updateDisplay() {
    if (this.element) {
      this.element.textContent = this.getFormattedTime();
    }
  }
}
