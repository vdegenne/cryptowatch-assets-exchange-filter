import coinmarketcapUrl from './coinmarketcap.js'
import { SELECTORS, selectCrossHair, getElement, getElementFromContent } from './utils.js'


async function main () {
  try {
    const container = await getElement('.cw-canvas-container')
    const nameTag = document.createElement('div')
    nameTag.style = 'cursor:pointer;color:white;position:absolute;bottom:initial;right:0;left:initial;top:0;height:36px;font-size:24px;font-weight:900;display:flex;justify-content:center;align-items:center;color:black;background-color:yellow;padding:2px 8px;z-index:99999'
    nameTag.innerText = window.location.pathname.match(/:(.*)-(.*)/)[1]
    nameTag.onmousedown = function (e) {
      e.stopPropagation()
      e.stopImmediatePropagation()
      e.preventDefault()
      window.open(coinmarketcapUrl(nameTag.innerText), '_blank')
    }
    container.appendChild(nameTag)
  } catch (e) {
    console.warn('Something went wrong here')
  }



  /* Events */
  document.addEventListener('keydown', async (e) => {
    if (e.key == 'f') {
      const price = parseFloat(document.title)
      const input = document.querySelector(SELECTORS.priceInput)
      const reactPropsName = Object.getOwnPropertyNames(input).filter(name => name.indexOf('reactProps') >= 0)[0]
      // console.log(input, reactPropsName, price)

      console.log(input[reactPropsName].onChange)
      input[reactPropsName].onChange({
        target: { value: `${price}` }
      })
      // input.unfocus()
      // prevent tool change in the chart frame
      selectCrossHair()
    }
    else if (e.key == 'F') {
      const button = await getElement(() => getElementFromContent('100%'))
      button?.click();
    }
    else if (e.code == 'KeyB') {
      const button = await getElement(() => getElementFromContent('Buy'))
      button?.click()
    }
    else if (e.code == 'KeyS') {
      const button = await getElement(() => getElementFromContent('Sell'))
      button?.click()
    }
    else if (e.code == 'Enter') {
      let button;
      try {
        button = await getElement(() => getElementFromContent(/^Review and/), 200)
      } catch (e) {
        button = await getElement(() => getElementFromContent(/^Confirm /), 200)
      }
      button?.click()
    }
  })
}


main()