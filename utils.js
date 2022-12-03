
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
  (async function () {
    let element;
    while (!isResolved) {
      element = document.querySelector(selector)
      if (element) {
        resolve(element)
        isResolved = true
      }
      await new Promise(r => setTimeout(r, 250))
    }
  })();

  return promise;
}