

let ua = window.navigator.userAgent.toLowerCase();
let UA = {
  lz: /lizhifm/i.test(ua),
  wx: /micromessenger/i.test(ua),
}

export {UA}