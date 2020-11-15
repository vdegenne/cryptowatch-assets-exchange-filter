/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} filePath Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 */
function injectScript(filePath,tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type','text/javascript');
  script.setAttribute('src',filePath);
  node.appendChild(script);
}

function injectAudio(filePath,tag) {
  const node = document.getElementsByTagName(tag)[0];
  const audio = new Audio(filePath)
  audio.id = 'cuip-audio'
  node.appendChild(audio)
}

injectScript(chrome.extension.getURL('charts.js'),'body');
injectAudio(chrome.extension.getURL('sounds/tick.mp3'), 'body')