const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const html = `<!DOCTYPE html>
<html>
<head>
<style>
@media screen and (min-width: 990px) {
  .test-drawer { display: none !important; }
}
</style>
</head>
<body>
<div class="test-drawer">HAMBURGER</div>
<script>
window.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.test-drawer');
  document.body.innerHTML += '<div>WIDTH: ' + window.innerWidth + ' DISPLAY: ' + window.getComputedStyle(el).display + '</div>';
});
</script>
</body>
</html>`;

fs.writeFileSync('scratch/test_computed.html', html);
execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=1400,450 --dump-dom "scratch/test_computed.html" > scratch/computed_out.html`);
console.log(fs.readFileSync('scratch/computed_out.html', 'utf8'));
