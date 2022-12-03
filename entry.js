import coinmarketcapUrl from './coinmarketcap.js'

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
}


main()










function getElement(selector, timeoutMs = 9000) {
  let resolve, reject, isResolved = false

  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  setTimeout(function () {
    if (!isResolved) {
      reject()
      isResolved = true
    }
  }, timeoutMs)

  /* loop */
  ;(async function () {
    let element;
    while (!isResolved) {
      element = document.querySelector(selector)
      if (element) {
        resolve(element)
        isResolved = true
      }
      await new Promise(r => window.setTimeout(r, 250))
    }
  })();

  return promise;
}