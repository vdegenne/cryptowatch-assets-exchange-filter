class Card {
  element;

  constructor (element) {
    this.element = element;
  }

  show () {
    this.element.style.display = 'inherit'
  }

  hide () {
    this.element.style.display = 'none'
  }

  getExchanges () {
    return [...this.element.querySelectorAll('.exchange-name-cell')].map(c => c.innerText.trim());
  }
}


class CardsUI {
  cards;
  exchange = undefined;

  constructor () {
    this.loadData()

    this.updateCards()
    this.createSelect()

    setInterval(() => {
      try {
        this.filter()
      }
      catch (e) {
        // console.log(e);
      }
    }, 1500)
  }

  loadData () {
    // if (localStorage.getItem('caef:exchange')) {
    this.exchange = localStorage.getItem('caef:exchange')
    // }
  }

  saveData (exchange) {
    localStorage.setItem('caef:exchange', exchange)
  }

  createSelect () {
    const select = document.createElement('select')
    select.id = 'caef-select'
    select.innerHTML = '<option value="">All Exchanges</option>';
    for (const exchange in cryptowatch.exchanges) {
      const option = document.createElement('option');
      option.value = option.innerText = exchange;
      if (this.exchange && this.exchange === exchange) {
        option.selected = true;
      }
      select.appendChild(option);
    }

    // styles
    const styles = document.createElement('style')
    styles.innerText = `
    #caef-select {
      background: transparent;
      color: #ededed;
      cursor: pointer;
      border: none;
      border-left: 1px solid #545454;
      padding-left: 5px;
      outline: none;
    }
    #caef-select > option {
      background: white;
      color: black;
    }
    `;
    document.body.appendChild(styles)

    const wrapper = document.createElement('span');
    wrapper.classList.add('menu');
    wrapper.appendChild(select)

    document.querySelector('#filter-bar-left').appendChild(wrapper)


    // SELECT CHANGE EVENT
    select.addEventListener('change', (e) => {
      const exchange = e.target.value;
      this.saveData(exchange);

      if  (exchange) {
        this.filter(exchange);
      }
      else {
        this.showAllCards();
      }
    })
  }

  updateCards () {
    const container = document.querySelector('.grid-container')
    this.cards = []
    for (const cardElement of container.querySelectorAll(':scope > div')) {
      this.cards.push(new Card(cardElement))
    }
  }

  showAllCards () {
    this.exchange = undefined
    for (const card of this.cards) {
      card.show()
    }
  }

  filter (exchange) {
    if (!exchange) {
      if (this.exchange) {
        exchange = this.exchange;
      }
      else {
        return;
      }
    }

    this.updateCards()

    for (const card of this.cards) {
      if (card.getExchanges().some(e => reduceExchangeName(e) === exchange)) {
        card.show();
      }
      else {
        card.hide();
      }
    }

    this.exchange = exchange;
  }
}

function reduceExchangeName (exchange) {
  return exchange.replaceAll('.', '').replaceAll(' ', '-').toLowerCase();
}


new CardsUI;