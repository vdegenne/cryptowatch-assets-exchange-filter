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
      const button = [...document.querySelectorAll('._1_R9vNUDdcou2Z7JyNUxJO')].find(el => el.innerText === '100%');
      button.click();
    }

    if (e.key === 'c') {
      const order = document.querySelector('button[title^=Cancel]');
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


setInterval(function () {
  const alertButton = document.querySelector('h4 ~ button');
  if (alertButton) {
    alertButton.click();
  }
}, 1000)


setTimeout(function () {
  document.querySelectorAll('._2Xm5L0ngs7YD5FrtLPs4kW').forEach(el => {
    el.style.border = '1px solid white'
    const pr3 = el.querySelector('.pr-3')
    pr3.innerText = pr3.innerText.slice(0, pr3.innerText.indexOf('/'))
    el.querySelector('.price').remove()
    console.log(pr3)
    pr3.style.fontWeight = 900;
  })

  const name = document.createElement('div')
  name.style = 'color:white;position:absolute;bottom:initial;right:0;left:initial;top:0;height:36px;font-size:24px;font-weight:900;display:flex;justify-content:center;align-items:center;color:black;background-color:white;padding:2px 8px'
  name.innerText = window.location.pathname.match(/:(.*)-(.*)/)[1]
  document.querySelector('.cw-canvas-container').appendChild(name)
}, 500)
