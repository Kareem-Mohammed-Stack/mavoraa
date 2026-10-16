const { execSync } = require('child_process');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\zezos\\.gemini\\antigravity\\brain\\f95ef814-f6c0-4f10-8685-3274478ed418';

execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=1400,350 --screenshot="${artifactDir}\\navbar-desktop-fresh.png" "file:///C:/Users/zezos/OneDrive/Desktop/orca/Mavoraa/test-nav-desktop.html"`);
console.log('Saved navbar-desktop-fresh.png');

execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=500,450 --screenshot="${artifactDir}\\navbar-mobile-fresh.png" "file:///C:/Users/zezos/OneDrive/Desktop/orca/Mavoraa/test-nav-mobile.html"`);
console.log('Saved navbar-mobile-fresh.png');
