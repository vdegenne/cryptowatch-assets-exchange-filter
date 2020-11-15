class Ticker {
  element;
  lastPrice;
  shouldEmitSound = true;

  static getTicker () {
    return document.querySelector('#price-ticker');
  }

  constructor () {
    // updater
    setInterval(() => {
      this.element = Ticker.getTicker();
      const value = this.getValue();
      
      // emit sound when the value changes
      if (this.lastPrice && value !== this.lastPrice) {
        if (this.shouldEmitSound) {
          emitSound()
        }
      }

      this.lastPrice = value;
    }, 1000)
  }

  getValue () {
    return this.element.innerText.trim();
  }
}

function emitSound() {
  document.querySelector('#cuip-audio').play();
}

new Ticker;