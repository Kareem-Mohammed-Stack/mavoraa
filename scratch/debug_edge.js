const { execSync } = require('child_process');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const script = `
  console.log("INNER WIDTH:", window.innerWidth);
  const hd = document.querySelector('header-drawer');
  console.log("HD DISPLAY:", hd ? window.getComputedStyle(hd).display : 'null');
  const sum = document.querySelector('.header__icon--menu');
  console.log("SUMMARY DISPLAY:", sum ? window.getComputedStyle(sum).display : 'null');
`;

const res = execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=1400,450 --dump-dom "test-nav-desktop.html"`);
console.log("HTML length:", res.length);
