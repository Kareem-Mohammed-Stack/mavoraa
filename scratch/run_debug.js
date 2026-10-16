const fs = require('fs');
const { execSync } = require('child_process');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

let html = fs.readFileSync('test-nav-mobile.html', 'utf8');
html = html.replace('</body>', '<div id="debug-info"></div><script>const cart = document.querySelector(".header__icon--cart"); const icons = document.querySelector(".header__icons"); document.getElementById("debug-info").textContent = "ICONS_RECT=" + JSON.stringify(icons.getBoundingClientRect()) + " CART_DISPLAY=" + window.getComputedStyle(cart).display + " CART_RECT=" + JSON.stringify(cart.getBoundingClientRect()) + " INNER_WIDTH=" + window.innerWidth; </script></body>');
fs.writeFileSync('scratch/test_mobile_debug.html', html);

const out = execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=390,450 --dump-dom "file:///C:/Users/zezos/OneDrive/Desktop/orca/Mavoraa/scratch/test_mobile_debug.html"`, { encoding: 'utf8' });
const m = out.match(/<div id="debug-info">([^<]+)<\/div>/);
console.log('MOBILE DEBUG:', m ? m[1] : 'not found');
