export const SELECTORS = {
  priceInput: '[id^="op-price-input-"]',
  crosshairIcon: '.icon-drawing-crosshair',
}

export function getElementFromContent (textContent, typeSelector = 'button') {
  if (typeof textContent == 'string') {
    textContent = new RegExp(textContent)
  }
  return [...document.querySelectorAll(typeSelector)].filter(el => el.textContent.trim().match(textContent))[0]
}

export function getElement(selector, timeoutMs = 9000) {
  let resolve, reject, isResolved = false

  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  setTimeout(() => {
    if (!isResolved) {
      reject()
      isResolved = true
    }
  }, timeoutMs)

  /* loop */
  ;(async function () {
    let element;
    while (!isResolved) {

      switch (typeof selector) {
        case 'string':
          element = document.querySelector(selector)
          break;
        case 'function':
          element = selector()
          break;
        default:
          throw new Error('unknown type')
      }

      if (element) {
        resolve(element)
        isResolved = true
      }

      await sleep(250)
    }
  })();

  return promise;
}

export function sleep(ms = 1000) {
  return new Promise(r => setTimeout(r, ms))
}

export async function selectCrossHair() {
  await sleep(10)
  document.querySelector(SELECTORS.crosshairIcon).dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
}