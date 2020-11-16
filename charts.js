class Ticker {
  element;
  lastPrice;
  shouldEmitSound = true;

  static getTicker() {
    return document.querySelector('#price-ticker');
  }

  updateTickerElement () {
    this.element = Ticker.getTicker();
  }

  constructor() {
    // updater
    setInterval(() => {
      this.updateTickerElement();
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

  getValue() {
    return this.element.innerText.trim();
  }

  click () {
    this.updateTickerElement();
    this.element.click();
  }
}

function emitSound() {
  document.querySelector('#cuip-audio').play();
}

function selectCrossHair() {
  document.querySelector('.icon-drawing-crosshair').dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
}

function registerEvents() {
  window.addEventListener('keypress', function (e) {
    if (e.key === 'f') {
      ticker.click();
      // prevent tool change in the chart frame
      selectCrossHair();
    }

    if (e.key === 'F') {
      document.querySelector('[data-testlabel="100%"]').click();
    }

    if (e.key === 'c') {
      const order = document.querySelector('.order-close-button');
      if (order) {
        order.click();
        selectCrossHair()
      }

      // setTimeout(selectCrossHair, 500)
    }

    if (e.key === 'b') {
      document.querySelector('[data-testlabel="buy"]').click();
    }
    if (e.key === 's') {
      document.querySelector('[data-testlabel="sell"]').click();
    }
  })
}

const ticker = new Ticker;
registerEvents();